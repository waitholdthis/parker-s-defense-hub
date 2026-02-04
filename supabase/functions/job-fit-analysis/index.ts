import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Build resume context from database content
function buildResumeContext(resumeData: any): string {
  const sections: string[] = [];

  if (resumeData.personal) {
    sections.push(`## Personal Information
Name: ${resumeData.personal.name}
Title: ${resumeData.personal.title}
Organization: ${resumeData.personal.organization}
Location: ${resumeData.personal.location}`);
  }

  if (resumeData.missionStatement) {
    sections.push(`## Mission Statement
${resumeData.missionStatement}`);
  }

  if (resumeData.skillChips?.length) {
    sections.push(`## Core Competencies
${resumeData.skillChips.join(", ")}`);
  }

  if (resumeData.executiveSummary?.length) {
    sections.push(`## Executive Summary
${resumeData.executiveSummary.map((s: string, i: number) => `${i + 1}. ${s}`).join("\n")}`);
  }

  if (resumeData.skills?.categories?.length) {
    sections.push(`## Skills Taxonomy
${resumeData.skills.categories.map((cat: any) =>
      `### ${cat.name}\n${cat.skills.map((s: any) => `- ${s.name} (${s.proficiency}, ${s.years} years)`).join("\n")}`
    ).join("\n\n")}`);
  }

  if (resumeData.experience?.length) {
    sections.push(`## Experience
${resumeData.experience.map((exp: any) =>
      `### ${exp.title} at ${exp.organization} (${exp.startDate} - ${exp.endDate})
Mission: ${exp.missionContext}
Responsibilities:
${exp.responsibilities.map((r: string) => `- ${r}`).join("\n")}
Key Outcomes:
${exp.outcomes.map((o: string) => `- ${o}`).join("\n")}`
    ).join("\n\n")}`);
  }

  if (resumeData.education?.length) {
    sections.push(`## Education & Professional Development
${resumeData.education.map((edu: any) =>
      `- ${edu.title} (${edu.institution}) - ${edu.status}: ${edu.description}`
    ).join("\n")}`);
  }

  if (resumeData.certifications?.length) {
    sections.push(`## Certifications
${resumeData.certifications.map((cert: any) =>
      `- ${cert.name} (${cert.issuer}) - ${cert.status}, ${cert.date}`
    ).join("\n")}`);
  }

  if (resumeData.projects?.length) {
    sections.push(`## Selected Projects
${resumeData.projects.map((proj: any) =>
      `### ${proj.title}
Problem: ${proj.problem}
Role: ${proj.role}
Approach: ${proj.approach}
Outcome: ${proj.outcome}
Tools: ${proj.tools?.join(", ") || "N/A"}`
    ).join("\n\n")}`);
  }

  if (resumeData.strengths?.length) {
    sections.push(`## Strengths
${resumeData.strengths.map((s: string) => `- ${s}`).join("\n")}`);
  }

  if (resumeData.developmentAreas?.length) {
    sections.push(`## Development Areas
${resumeData.developmentAreas.map((d: string) => `- ${d}`).join("\n")}`);
  }

  if (resumeData.gaps?.length) {
    sections.push(`## Capability Gaps & Mitigation
${resumeData.gaps.map((g: any) => `- Gap: ${g.gap}\n  Mitigation: ${g.mitigation}`).join("\n")}`);
  }

  return sections.join("\n\n");
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobDescription } = await req.json();

    if (!jobDescription || typeof jobDescription !== "string" || jobDescription.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Please provide a job description with at least 10 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase configuration is missing");
    }

    // Fetch resume data from database
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: resumeRow, error: dbError } = await supabase
      .from("resume_content")
      .select("content")
      .limit(1)
      .single();

    if (dbError || !resumeRow) {
      console.error("Database error:", dbError);
      throw new Error("Failed to fetch resume data");
    }

    const resumeData = resumeRow.content;
    const resumeContext = buildResumeContext(resumeData);

    const systemPrompt = `You are an expert recruiter and talent analyst. Your task is to analyze how well a candidate matches a job description.

You will receive:
1. A complete professional profile/resume
2. A job description or requirements

Analyze the match and return a JSON response with the following structure:
{
  "overallScore": <number 0-100>,
  "categoryScores": {
    "skills": <number 0-100>,
    "experience": <number 0-100>,
    "education": <number 0-100>
  },
  "strengths": [<string>, ...],
  "gaps": [<string>, ...],
  "talkingPoints": [<string>, ...],
  "summary": <string>
}

Guidelines for scoring:
- 90-100: Exceptional match, exceeds most requirements
- 75-89: Strong match, meets most requirements with minor gaps
- 60-74: Good match, meets core requirements but has notable gaps
- 45-59: Partial match, meets some requirements but significant gaps
- Below 45: Limited match, major alignment issues

Be specific and actionable in your analysis. Reference specific skills, experiences, and qualifications.

IMPORTANT: Return ONLY valid JSON, no markdown formatting or additional text.`;

    const userPrompt = `## Candidate Resume/Profile:

${resumeContext}

---

## Job Description to Match Against:

${jobDescription}

---

Analyze this candidate's fit for the role and return the structured JSON analysis.`;

    console.log("Calling AI gateway for job fit analysis...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI response");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI response received:", content.substring(0, 200));

    // Parse the JSON response from AI
    let analysis;
    try {
      // Remove any markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, content);
      throw new Error("Failed to parse analysis results");
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("job-fit-analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
