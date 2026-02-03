import { Lightbulb, Target, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";

export function Projects() {
  const { data } = useResumeDataContext();

  return (
    <section id="projects" className="section section-alt">
      <div className="container-wide">
        <h2 className="mb-4">Selected Projects & Case Studies</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Representative examples demonstrating CWMD, CBRN, and interagency
          coordination capabilities.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-4">{project.title}</h3>

              <div className="space-y-4">
                {/* Problem */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-destructive" />
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-proficiency-working/20 flex items-center justify-center">
                    <Target className="h-4 w-4 text-proficiency-working" />
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-proficiency-advanced/20 flex items-center justify-center">
                    <Wrench className="h-4 w-4 text-proficiency-advanced" />
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
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    Tools & Methods
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="secondary"
                        className="text-xs"
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
