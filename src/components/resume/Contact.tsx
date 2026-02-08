import { Mail, Linkedin, Briefcase, Plane, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Contact() {
  const { data } = useResumeDataContext();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className={`section relative overflow-hidden ${isVisible ? "animate-fade-in" : "opacity-0"}`} ref={ref}>
      {/* Decorative gradient blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-accent/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container-wide relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Interested in discussing CWMD, CBRN, homeland security, or emergency
            management opportunities? I welcome professional inquiries and
            collaboration.
          </p>

          {/* Contact Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-accent text-white border-0 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <a href={`mailto:${data.personal.email}`} className="gap-2">
                <Mail className="h-4 w-4" />
                Send Email
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200"
            >
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>

          {/* Availability Info */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass-card p-4 glow-hover transition-all duration-200 opacity-0 animate-slide-up" style={{ animationDelay: "0ms" }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium font-display">Availability</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.personal.availability}
              </p>
            </div>
            <div className="glass-card p-4 glow-hover transition-all duration-200 opacity-0 animate-slide-up" style={{ animationDelay: "150ms" }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center">
                  <Plane className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium font-display">Travel</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.personal.travelWillingness}
              </p>
            </div>
            <div className="glass-card p-4 glow-hover transition-all duration-200 opacity-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-proficiency-advanced to-emerald-400 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium font-display">Clearance</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.personal.clearance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
