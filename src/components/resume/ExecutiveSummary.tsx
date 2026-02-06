import { CheckCircle } from "lucide-react";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ExecutiveSummary() {
  const { data } = useResumeDataContext();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="summary" className={`section section-alt ${isVisible ? "animate-fade-in" : "opacity-0"}`} ref={ref}>
      <div className="container-wide">
        <h2 className="mb-8">Executive Summary</h2>
        <div className="max-w-4xl">
          <ul className="space-y-4">
            {data.executiveSummary.map((item, index) => (
              <li key={index} className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
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
