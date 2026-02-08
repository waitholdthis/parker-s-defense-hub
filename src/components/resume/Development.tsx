import { CheckCircle, TrendingUp, AlertTriangle, Calendar, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const statusColors = {
  "In Progress": "bg-proficiency-working text-white shadow-sm shadow-proficiency-working/30",
  Planned: "bg-muted text-muted-foreground",
  Completed: "bg-proficiency-advanced text-white shadow-sm shadow-proficiency-advanced/30",
};

export function Development() {
  const { data } = useResumeDataContext();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="development" className={`section ${isVisible ? "animate-fade-in" : "opacity-0"}`} ref={ref}>
      <div className="container-wide">
        <h2 className="mb-4">
          Continuous <span className="gradient-text">Improvement</span> & Mission Readiness
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          A commitment to professional growth, honest self-assessment, and
          proactive capability development.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Strengths */}
          <div className="glass-card p-6 glow-hover transition-all duration-300 overflow-hidden opacity-0 animate-slide-up" style={{ animationDelay: "0ms" }}>
            <div className="h-1 bg-gradient-to-r from-proficiency-advanced to-emerald-400 rounded-full -mx-6 -mt-6 mb-5" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-proficiency-advanced to-emerald-400 flex items-center justify-center shadow-md">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold font-display">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {data.strengths.map((strength, index) => (
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
          <div className="glass-card p-6 glow-hover transition-all duration-300 overflow-hidden opacity-0 animate-slide-up" style={{ animationDelay: "150ms" }}>
            <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full -mx-6 -mt-6 mb-5" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold font-display">Development Areas</h3>
            </div>
            <ul className="space-y-3">
              {data.developmentAreas.map((area, index) => (
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
          <div className="glass-card p-6 glow-hover transition-all duration-300 overflow-hidden opacity-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="h-1 bg-gradient-to-r from-proficiency-foundational to-amber-400 rounded-full -mx-6 -mt-6 mb-5" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-proficiency-foundational to-amber-400 flex items-center justify-center shadow-md">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold font-display">Gaps & Mitigation</h3>
            </div>
            <ul className="space-y-4">
              {data.gaps.map((item, index) => (
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
        <div className="mt-12 glass-card p-6 gradient-border overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold font-display">Current Learning Plan</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.learningPlan.map((item, index) => (
              <div
                key={index}
                className="bg-secondary/50 rounded-xl p-4 border border-border/50 hover:-translate-y-0.5 transition-all duration-200 opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge
                    className={`text-xs rounded-full ${
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
