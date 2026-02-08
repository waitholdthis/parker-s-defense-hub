import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Experience() {
  const { data } = useResumeDataContext();
  const { ref, isVisible } = useScrollAnimation();
  const [expandedIds, setExpandedIds] = useState<string[]>([
    data.experience[0]?.id,
  ]);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="experience" className={`section section-alt ${isVisible ? "animate-fade-in" : "opacity-0"}`} ref={ref}>
      <div className="container-wide">
        <h2 className="mb-8">
          Professional <span className="gradient-text">Experience</span>
        </h2>

        <div className="relative">
          {/* Timeline line - gradient */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 rounded-full" />

          <div className="space-y-8">
            {data.experience.map((role, index) => {
              const isExpanded = expandedIds.includes(role.id);

              return (
                <div
                  key={role.id}
                  className="relative pl-8 md:pl-20 opacity-0 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Timeline dot - gradient with glow */}
                  <div className={`absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background shadow-md ${index === 0 ? "animate-glow-pulse ring-4 ring-primary/20" : ""}`} />

                  <div className="glass-card p-6 glow-hover hover:-translate-y-0.5 transition-all duration-300 border-l-2 border-l-primary/30">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold font-display">{role.title}</h3>
                        <p className="text-accent font-medium">
                          {role.organization}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {role.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {role.startDate} – {role.endDate}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(role.id)}
                        className="flex-shrink-0 rounded-full hover:bg-primary/5"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            More
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Mission Context */}
                    <p className="text-foreground/90 leading-relaxed mb-4">
                      {role.missionContext}
                    </p>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="space-y-4 pt-4 border-t border-border/50 animate-scale-in">
                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {role.responsibilities.map((resp, i) => (
                              <li
                                key={i}
                                className="text-sm text-foreground/80 pl-4 border-l-2 border-accent/40"
                              >
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Outcomes */}
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                            Measurable Outcomes
                          </h4>
                          <ul className="space-y-2">
                            {role.outcomes.map((outcome, i) => (
                              <li
                                key={i}
                                className="text-sm text-foreground/80 pl-4 border-l-2 border-proficiency-advanced/60"
                              >
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
