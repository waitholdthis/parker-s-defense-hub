import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Verify admin session
async function verifySession(supabase: any, sessionToken: string): Promise<boolean> {
  if (!sessionToken) return false;
  
  const { data: session, error } = await supabase
    .from("admin_sessions")
    .select("id, expires_at")
    .eq("session_token", sessionToken)
    .maybeSingle();

  if (error || !session) return false;
  return new Date(session.expires_at) > new Date();
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
    const { action, sessionToken, content } = await req.json();
    
    // GET: Fetch resume content (no auth required - public read)
    if (action === "get") {
      const { data, error } = await supabase
        .from("resume_content")
        .select("content, updated_at")
        .eq("id", "00000000-0000-0000-0000-000000000001")
        .maybeSingle();

      if (error) {
        console.error("Error fetching resume:", error);
        return new Response(
          JSON.stringify({ error: "Failed to fetch resume content" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ 
          content: data?.content || null, 
          updatedAt: data?.updated_at || null 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // UPDATE: Requires admin authentication
    if (action === "update") {
      const isValid = await verifySession(supabase, sessionToken);
      
      if (!isValid) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!content) {
        return new Response(
          JSON.stringify({ error: "Content is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Validate JSON structure
      try {
        if (typeof content !== "object") {
          throw new Error("Content must be an object");
        }
      } catch (e) {
        return new Response(
          JSON.stringify({ error: "Invalid content format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get admin user id from session
      const { data: session } = await supabase
        .from("admin_sessions")
        .select("admin_user_id")
        .eq("session_token", sessionToken)
        .single();

      const { error: updateError } = await supabase
        .from("resume_content")
        .update({ 
          content,
          updated_by: session?.admin_user_id || null
        })
        .eq("id", "00000000-0000-0000-0000-000000000001");

      if (updateError) {
        console.error("Error updating resume:", updateError);
        return new Response(
          JSON.stringify({ error: "Failed to update resume content" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("Resume content updated successfully");
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
    console.error("Admin resume error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
