import { CheckCircle } from "lucide-react";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ExecutiveSummary() {
  const { data } = useResumeDataContext();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="summary" className={`section section-alt ${isVisible ? "animate-fade-in" : "opacity-0"}`} ref={ref}>
      <div className="container-wide">
        <h2 className="mb-8">
          <span className="gradient-text">Executive</span> Summary
        </h2>
        <div className="max-w-4xl">
          <ul className="space-y-4">
            {data.executiveSummary.map((item, index) => (
              <li
                key={index}
                className="flex gap-4 glass-card p-4 hover:scale-[1.01] transition-all duration-200 glow-hover opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mt-0.5">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-foreground/90 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
