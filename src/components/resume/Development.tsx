import { CheckCircle, TrendingUp, AlertTriangle, Calendar, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import resumeData from "@/data/resume.json";

const statusColors = {
  "In Progress": "bg-proficiency-working text-white",
  Planned: "bg-muted text-muted-foreground",
  Completed: "bg-proficiency-advanced text-white",
};

export function Development() {
  return (
    <section id="development" className="section">
      <div className="container-wide">
        <h2 className="mb-4">Continuous Improvement & Mission Readiness</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          A commitment to professional growth, honest self-assessment, and
          proactive capability development.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Strengths */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-proficiency-advanced/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-proficiency-advanced" />
              </div>
              <h3 className="text-lg font-semibold">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {resumeData.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-foreground/80">
                  <span className="font-medium text-foreground">
                    {strength.split(":")[0]}:
                  </span>
                  {strength.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>

          {/* Development Areas */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-proficiency-working/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-proficiency-working" />
              </div>
              <h3 className="text-lg font-semibold">Development Areas</h3>
            </div>
            <ul className="space-y-3">
              {resumeData.developmentAreas.map((area, index) => (
                <li key={index} className="text-sm text-foreground/80">
                  <span className="font-medium text-foreground">
                    {area.split(":")[0]}:
                  </span>
                  {area.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps with Mitigation */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-proficiency-foundational/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-proficiency-foundational" />
              </div>
              <h3 className="text-lg font-semibold">Gaps & Mitigation</h3>
            </div>
            <ul className="space-y-4">
              {resumeData.gaps.map((item, index) => (
                <li key={index} className="text-sm">
                  <p className="font-medium text-foreground mb-1">
                    {item.gap}
                  </p>
                  <p className="text-foreground/70 text-xs">
                    <span className="font-medium">Mitigation:</span>{" "}
                    {item.mitigation}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Current Learning Plan */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Current Learning Plan</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resumeData.learningPlan.map((item, index) => (
              <div
                key={index}
                className="bg-secondary/50 rounded-lg p-4 border border-border"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge
                    className={`text-xs ${
                      statusColors[item.status as keyof typeof statusColors] ||
                      statusColors.Planned
                    }`}
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground mb-2">
                  {item.item}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {item.targetDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
