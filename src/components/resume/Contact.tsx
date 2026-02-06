import { Mail, Linkedin, MapPin, Briefcase, Plane, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Contact() {
  const { data } = useResumeDataContext();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className={`section section-alt ${isVisible ? "animate-fade-in" : "opacity-0"}`} ref={ref}>
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            Interested in discussing CWMD, CBRN, homeland security, or emergency
            management opportunities? I welcome professional inquiries and
            collaboration.
          </p>

          {/* Contact Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" asChild>
              <a href={`mailto:${data.personal.email}`} className="gap-2">
                <Mail className="h-4 w-4" />
                Send Email
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
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
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-accent mb-2">
                <Briefcase className="h-5 w-5" />
                <span className="font-medium">Availability</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.personal.availability}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-accent mb-2">
                <Plane className="h-5 w-5" />
                <span className="font-medium">Travel</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.personal.travelWillingness}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-accent mb-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Clearance</span>
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
