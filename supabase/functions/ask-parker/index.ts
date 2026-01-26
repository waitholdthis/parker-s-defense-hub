import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Parker's resume data embedded for RAG
const resumeData = {
  personal: {
    name: "Parker Tootill",
    title: "Senior CBRN Warrant Officer",
    organization: "18th Airborne Corps",
    location: "Fort Liberty, NC",
  },
  missionStatement: "Senior CBRN Warrant Officer with extensive experience in CWMD operations, interagency coordination, and force readiness. Proven track record of developing and executing comprehensive CBRN defense programs that enhance operational capabilities across DoD, DHS, and state/local emergency management partners. Committed to advancing national security through strategic planning, rigorous training programs, and data-driven decision support.",
  skillChips: ["CWMD", "CBRN", "Homeland Security", "Emergency Management", "Planning", "Operations", "Exercises", "Risk Assessment", "Training"],
  executiveSummary: [
    "Senior CBRN Warrant Officer with extensive experience leading chemical, biological, radiological, and nuclear defense operations across tactical, operational, and strategic levels.",
    "Subject matter expert in Countering Weapons of Mass Destruction (CWMD) with demonstrated success in interagency coordination involving DoD, DHS, and state/local emergency management stakeholders.",
    "Designed and executed large-scale CBRN exercises that validated readiness and identified capability gaps, resulting in measurable improvements to unit preparedness.",
    "Led cross-functional teams in developing threat assessments, risk mitigation strategies, and operational plans that directly supported senior leader decision-making.",
    "Established training programs and standard operating procedures adopted across multiple units, enhancing organizational CBRN response capabilities.",
    "Currently pursuing professional development in AI/ML applications for defense and national security operations, with focus on responsible AI integration for decision support and threat analysis.",
    "Proven ability to translate complex technical information into actionable guidance for commanders and policymakers across military and civilian organizations.",
    "Track record of building and maintaining relationships with key stakeholders in CWMD, homeland security, and emergency management communities."
  ],
  skillCategories: [
    { name: "CWMD & Counterproliferation", skills: ["CWMD Strategy & Policy (Advanced)", "Counterproliferation Operations (Advanced)", "WMD Threat Analysis (Advanced)", "Nonproliferation Programs (Working)"] },
    { name: "CBRN Defense & Response", skills: ["CBRN Reconnaissance (Advanced)", "Hazard Prediction & Modeling (Advanced)", "Decontamination Operations (Advanced)", "CBRN Equipment Management (Advanced)", "Consequence Management (Working)"] },
    { name: "Nuclear Weapons Effects & Proliferation", skills: ["Nuclear Weapons Effects Analysis (Working)", "Proliferation Pathways (Working)", "Nuclear Security Policy (Foundational)"] },
    { name: "Homeland Security Mission Areas", skills: ["Critical Infrastructure Protection (Working)", "Border & Transportation Security (Foundational)", "Domestic Counterterrorism (Working)", "Defense Support to Civil Authorities (Advanced)"] },
    { name: "Emergency Management", skills: ["Preparedness Planning (Advanced)", "Response Operations (Advanced)", "Recovery Coordination (Working)", "Mitigation Strategies (Working)"] },
    { name: "Incident Management", skills: ["Incident Command System (ICS) (Advanced)", "NIMS Framework (Advanced)", "Unified Command Operations (Advanced)", "Emergency Operations Center (Working)"] },
    { name: "Planning, Exercises & Evaluation", skills: ["Operational Planning (Advanced)", "Exercise Design & Execution (Advanced)", "After Action Reviews (Advanced)", "Doctrine Development (Working)"] },
    { name: "Risk, Threat & Vulnerability Assessment", skills: ["Threat Assessment (Advanced)", "Vulnerability Analysis (Advanced)", "Risk Mitigation Planning (Advanced)", "Intelligence Integration (Working)"] },
    { name: "Interagency Coordination & Stakeholder Engagement", skills: ["DoD-DHS Coordination (Advanced)", "State/Local Liaison (Advanced)", "Coalition Building (Working)", "Stakeholder Communication (Advanced)"] },
    { name: "Decision Support & Analytics", skills: ["Decision Support Systems (Working)", "Data Analysis & Visualization (Working)", "Briefing & Presentation (Advanced)", "Report Writing (Advanced)"] },
    { name: "Technology & Responsible AI", skills: ["AI/ML Fundamentals (Foundational)", "Responsible AI for Defense (Foundational)", "Emerging Technology Assessment (Working)", "Digital Transformation (Foundational)"] }
  ],
  experience: [
    {
      title: "Senior CBRN Warrant Officer",
      organization: "18th Airborne Corps",
      location: "Fort Liberty, NC",
      dates: "2021 - Present",
      missionContext: "Serves as the principal CBRN advisor to the Corps Commander, providing technical expertise and strategic guidance on CWMD operations, CBRN defense, and force readiness for America's Contingency Corps.",
      responsibilities: [
        "Advise senior leaders on CBRN threats, vulnerabilities, and mitigation strategies across the Corps' global mission set",
        "Lead development and execution of CBRN training programs for subordinate units",
        "Coordinate CBRN operations and planning with joint, interagency, and multinational partners",
        "Manage CBRN equipment modernization and capability development initiatives"
      ],
      outcomes: [
        "Established Corps-wide CBRN readiness assessment program, improving unit preparedness metrics",
        "Led major exercises integrating CBRN scenarios with conventional operations",
        "Developed standardized SOPs adopted by subordinate brigades"
      ]
    }
  ],
  education: [
    { title: "Graduate Certificate Program in National Security Studies", institution: "U.S. Army War College", status: "Completed", description: "Advanced study in national security strategy, policy, and senior leader decision-making." },
    { title: "CWMD and Nuclear Weapons Effects, Policy, and Proliferation Focus", institution: "Air Force Institute of Technology", status: "In Progress", description: "Specialized coursework in nuclear weapons effects analysis, proliferation dynamics, and CWMD policy frameworks." },
    { title: "Strategic AI/ML Broadening Seminar", institution: "DEVCOM Army Research Lab", status: "Completed", description: "Executive-level seminar on artificial intelligence and machine learning applications for defense, focusing on responsible AI implementation and strategic implications." }
  ],
  projects: [
    { title: "Corps-Wide CBRN Readiness Assessment Program", problem: "Lack of standardized metrics to assess CBRN readiness across diverse subordinate units", role: "Program Lead and Principal Developer", outcome: "Created enterprise-wide visibility into CBRN readiness, enabling targeted resource allocation and achieving improvement in overall readiness scores within 12 months." },
    { title: "Multi-Echelon CWMD Exercise Series", problem: "Limited integration of CWMD scenarios into conventional training exercises", role: "Exercise Designer and Chief Evaluator", outcome: "Executed exercises identifying critical capability gaps and driving updates to unit SOPs and training programs." },
    { title: "Interagency CBRN Response Coordination Initiative", problem: "Insufficient coordination mechanisms between military CBRN units and state/local emergency management agencies", role: "Military Liaison and Working Group Lead", outcome: "Created formal coordination agreements with state agencies, reduced notification timelines, and established template for replication across other installations." }
  ],
  strengths: [
    "Operational Leadership: Proven ability to lead CBRN operations across tactical, operational, and strategic levels with consistent mission success.",
    "CBRN Technical Expertise: Deep knowledge of CBRN threats, detection, protection, and decontamination operations built over years of specialized service.",
    "Interagency Coordination: Demonstrated success building and maintaining relationships across DoD, DHS, and state/local emergency management organizations.",
    "Training and Exercise Design: Extensive experience developing and executing realistic training programs and exercises that improve organizational readiness.",
    "Strategic Communication: Ability to translate complex technical CBRN information into clear guidance for senior leaders and diverse stakeholders.",
    "Operational Planning: Strong analytical skills applied to threat assessment, risk mitigation, and operational planning at multiple echelons.",
    "Decision Support: Track record of providing timely, accurate analysis that directly informs senior leader decisions.",
    "Adaptability: Proven ability to operate effectively in ambiguous environments and rapidly changing conditions."
  ],
  developmentAreas: [
    "Nuclear Policy Analysis: Deepening expertise in nuclear weapons policy, arms control frameworks, and strategic deterrence concepts through AFIT coursework.",
    "Advanced Data Analytics: Building proficiency in data analysis tools and methods to enhance decision support capabilities.",
    "AI/ML Applications: Developing foundational understanding of responsible AI applications for defense through self-directed learning and professional development.",
    "Emergency Management Doctrine: Expanding knowledge of civilian emergency management frameworks beyond military-specific applications.",
    "Strategic Communication: Enhancing written communication skills for policy-level audiences through targeted professional development.",
    "Coalition Operations: Seeking opportunities to deepen experience with multinational CBRN coordination and interoperability."
  ],
  gaps: [
    { gap: "Limited civilian emergency management credentials", mitigation: "Pursuing relevant certifications (e.g., CEM) and seeking opportunities for state/local emergency management engagement." },
    { gap: "Emerging technology depth (AI/ML)", mitigation: "Completing professional development courses, participating in defense AI initiatives, and applying concepts to current work." },
    { gap: "Nuclear policy academic credentials", mitigation: "Completing AFIT program with focus on nuclear weapons effects, policy, and proliferation." },
    { gap: "Private sector/contractor experience", mitigation: "Engaging with industry partners, attending relevant conferences, and building professional network outside government." }
  ]
};

// Convert resume data to a context string for the AI
function buildResumeContext(): string {
  const sections: string[] = [];
  
  sections.push(`## Personal Information
Name: ${resumeData.personal.name}
Title: ${resumeData.personal.title}
Organization: ${resumeData.personal.organization}
Location: ${resumeData.personal.location}`);

  sections.push(`## Mission Statement
${resumeData.missionStatement}`);

  sections.push(`## Core Competencies
${resumeData.skillChips.join(", ")}`);

  sections.push(`## Executive Summary
${resumeData.executiveSummary.map((s, i) => `${i + 1}. ${s}`).join("\n")}`);

  sections.push(`## Skills Taxonomy
${resumeData.skillCategories.map(cat => 
  `### ${cat.name}\n${cat.skills.map(s => `- ${s}`).join("\n")}`
).join("\n\n")}`);

  sections.push(`## Experience
${resumeData.experience.map(exp => 
  `### ${exp.title} at ${exp.organization} (${exp.dates})
Mission: ${exp.missionContext}
Responsibilities:
${exp.responsibilities.map(r => `- ${r}`).join("\n")}
Key Outcomes:
${exp.outcomes.map(o => `- ${o}`).join("\n")}`
).join("\n\n")}`);

  sections.push(`## Education & Professional Development
${resumeData.education.map(edu => 
  `- ${edu.title} (${edu.institution}) - ${edu.status}: ${edu.description}`
).join("\n")}`);

  sections.push(`## Selected Projects
${resumeData.projects.map(proj => 
  `### ${proj.title}
Problem: ${proj.problem}
Role: ${proj.role}
Outcome: ${proj.outcome}`
).join("\n\n")}`);

  sections.push(`## Strengths
${resumeData.strengths.map(s => `- ${s}`).join("\n")}`);

  sections.push(`## Development Areas
${resumeData.developmentAreas.map(d => `- ${d}`).join("\n")}`);

  sections.push(`## Capability Gaps & Mitigation
${resumeData.gaps.map(g => `- Gap: ${g.gap}\n  Mitigation: ${g.mitigation}`).join("\n")}`);

  return sections.join("\n\n");
}

// Determine which sections are relevant to a question
function identifyRelevantSections(question: string): string[] {
  const q = question.toLowerCase();
  const sections: string[] = [];
  
  if (q.includes("cwmd") || q.includes("counter") || q.includes("wmd") || q.includes("weapon")) {
    sections.push("Skills Taxonomy", "Experience", "Projects");
  }
  if (q.includes("cbrn") || q.includes("chemical") || q.includes("biological") || q.includes("nuclear") || q.includes("radiological")) {
    sections.push("Skills Taxonomy", "Experience", "Executive Summary");
  }
  if (q.includes("emergency") || q.includes("management") || q.includes("homeland") || q.includes("dhs")) {
    sections.push("Skills Taxonomy", "Experience", "Projects");
  }
  if (q.includes("experience") || q.includes("background") || q.includes("work")) {
    sections.push("Experience", "Executive Summary");
  }
  if (q.includes("skill") || q.includes("expert") || q.includes("proficien") || q.includes("capabil")) {
    sections.push("Skills Taxonomy", "Strengths");
  }
  if (q.includes("education") || q.includes("training") || q.includes("degree") || q.includes("certificate") || q.includes("course")) {
    sections.push("Education & Professional Development");
  }
  if (q.includes("project") || q.includes("case") || q.includes("accomplish") || q.includes("achiev")) {
    sections.push("Projects", "Experience");
  }
  if (q.includes("strength") || q.includes("strong") || q.includes("good at")) {
    sections.push("Strengths");
  }
  if (q.includes("gap") || q.includes("weakness") || q.includes("develop") || q.includes("improv") || q.includes("learn")) {
    sections.push("Development Areas", "Capability Gaps & Mitigation");
  }
  if (q.includes("role") || q.includes("suited") || q.includes("fit") || q.includes("job") || q.includes("position")) {
    sections.push("Executive Summary", "Skills Taxonomy", "Experience", "Strengths");
  }
  if (q.includes("interagency") || q.includes("coordination") || q.includes("stakeholder")) {
    sections.push("Experience", "Projects", "Skills Taxonomy");
  }
  if (q.includes("ai") || q.includes("ml") || q.includes("machine learning") || q.includes("artificial intelligence") || q.includes("technology")) {
    sections.push("Education & Professional Development", "Skills Taxonomy", "Development Areas");
  }
  
  // If no specific sections identified, return general summary sections
  if (sections.length === 0) {
    sections.push("Executive Summary", "Skills Taxonomy", "Experience");
  }
  
  return [...new Set(sections)];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get the latest user question for section identification
    const latestUserMessage = messages.filter((m: { role: string }) => m.role === "user").pop();
    const userQuestion = latestUserMessage?.content || "";
    const relevantSections = identifyRelevantSections(userQuestion);

    const resumeContext = buildResumeContext();
    
    const systemPrompt = `You are an AI assistant that answers questions about Parker Tootill based ONLY on the information provided below. You must:

1. ONLY use information from the provided resume data to answer questions
2. If information is not available in the data, clearly state "I don't have that information in Parker's profile" and ask for clarification
3. Always cite which section(s) you used (e.g., "Based on the Experience section..." or "According to the Skills Taxonomy...")
4. Be professional, concise, and helpful
5. When asked about role suitability or job matching, analyze against the skills, experience, and any noted gaps
6. When discussing gaps, always include the mitigation plan if available

Here is Parker Tootill's complete professional profile:

${resumeContext}

---
Relevant sections for this query: ${relevantSections.join(", ")}

Remember: Always end your response with a brief disclaimer in italics: *This response is generated from Parker's profile data and should be verified for official use.*`;

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
          ...messages,
        ],
        stream: true,
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
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("ask-parker error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
