import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple hash function for password comparison
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Generate secure session token
function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { action, password, sessionToken } = await req.json();
    
    if (action === "login") {
      if (!password) {
        return new Response(
          JSON.stringify({ error: "Password is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Compare against the ADMIN_PASSWORD secret
      const adminPassword = Deno.env.get("ADMIN_PASSWORD");
      
      if (!adminPassword) {
        console.error("ADMIN_PASSWORD secret not configured");
        return new Response(
          JSON.stringify({ error: "Server configuration error" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (password !== adminPassword) {
        return new Response(
          JSON.stringify({ error: "Invalid password" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get or create admin user for session tracking
      let adminUserId: string;
      const { data: existingUser } = await supabase
        .from("admin_users")
        .select("id")
        .eq("username", "admin")
        .maybeSingle();

      if (existingUser) {
        adminUserId = existingUser.id;
      } else {
        // Create admin user if doesn't exist
        const passwordHash = await hashPassword(password);
        const { data: newUser, error: createError } = await supabase
          .from("admin_users")
          .insert({ username: "admin", password_hash: passwordHash })
          .select("id")
          .single();
        
        if (createError || !newUser) {
          console.error("Error creating admin user:", createError);
          return new Response(
            JSON.stringify({ error: "Failed to initialize admin" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        adminUserId = newUser.id;
      }

      // Create new session
      const newSessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24-hour session

      // Delete any existing sessions for this user
      await supabase
        .from("admin_sessions")
        .delete()
        .eq("admin_user_id", adminUserId);

      // Create new session
      const { error: sessionError } = await supabase
        .from("admin_sessions")
        .insert({
          admin_user_id: adminUserId,
          session_token: newSessionToken,
          expires_at: expiresAt.toISOString(),
        });

      if (sessionError) {
        console.error("Error creating session:", sessionError);
        return new Response(
          JSON.stringify({ error: "Failed to create session" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("Admin login successful");
      return new Response(
        JSON.stringify({ 
          success: true, 
          sessionToken: newSessionToken,
          expiresAt: expiresAt.toISOString()
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "verify") {
      if (!sessionToken) {
        return new Response(
          JSON.stringify({ valid: false }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: session, error: sessionError } = await supabase
        .from("admin_sessions")
        .select("id, expires_at")
        .eq("session_token", sessionToken)
        .maybeSingle();

      if (sessionError || !session) {
        return new Response(
          JSON.stringify({ valid: false }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const isValid = new Date(session.expires_at) > new Date();
      
      return new Response(
        JSON.stringify({ valid: isValid }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "logout") {
      if (sessionToken) {
        await supabase
          .from("admin_sessions")
          .delete()
          .eq("session_token", sessionToken);
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Admin login error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
