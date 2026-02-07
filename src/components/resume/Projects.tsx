import { Lightbulb, Target, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Projects() {
  const { data } = useResumeDataContext();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className={`section section-alt ${isVisible ? "animate-fade-in" : "opacity-0"}`} ref={ref}>
      <div className="container-wide">
        <h2 className="mb-4">
          Selected <span className="gradient-text">Projects</span> & Case Studies
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Representative examples demonstrating CWMD, CBRN, and interagency
          coordination capabilities.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {data.projects.map((project, index) => (
            <div
              key={project.id}
              className="glass-card p-6 glow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full -mx-6 -mt-6 mb-5" />
              <h3 className="text-lg font-semibold mb-4 font-display">{project.title}</h3>

              <div className="space-y-4">
                {/* Problem */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-destructive to-orange-400 flex items-center justify-center shadow-sm">
                    <Lightbulb className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      Problem
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                </div>

                {/* Role & Approach */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      Role & Approach
                    </p>
                    <p className="text-sm font-medium text-accent mb-1">
                      {project.role}
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {project.approach}
                    </p>
                  </div>
                </div>

                {/* Outcome */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-proficiency-advanced to-emerald-400 flex items-center justify-center shadow-sm">
                    <Wrench className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      Outcome
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                {/* Tools */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    Tools & Methods
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="secondary"
                        className="text-xs rounded-full hover:bg-primary/5 hover:border-primary/20 transition-colors duration-200"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
