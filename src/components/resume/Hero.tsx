import { MapPin, Download, Linkedin, Mail, User } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
import { useResumeDownload } from "@/hooks/useResumeDownload";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PHOTO_URL = `${import.meta.env.BASE_URL}headshot.jpg`;

export function Hero() {
  const { data } = useResumeDataContext();
  const { downloadResume, isGenerating } = useResumeDownload();
  const { ref, isVisible } = useScrollAnimation();

  const handleDownload = () => {
    downloadResume(data);
  };

  return (
    <section
      id="hero"
      className={`relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
      ref={ref}
    >
      {/* Decorative gradient blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-gradient-to-tr from-accent/15 to-primary/5 rounded-full blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container-wide relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left: Text content */}
          <div className="flex-1 min-w-0">
            {/* Name and Title */}
            <h1 className="mb-2 gradient-text">{data.personal.name}</h1>
            <p className="text-xl md:text-2xl font-semibold text-accent mb-4 font-display">
              {data.personal.title}
            </p>
            <p className="text-lg text-muted-foreground mb-2">
              {data.personal.organization}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="h-4 w-4" />
              <span>{data.personal.location}</span>
            </div>

            {/* Mission Statement */}
            <p className="text-lg leading-relaxed text-foreground/90 mb-8">
              {data.missionStatement}
            </p>

            {/* Contact Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-accent text-white border-0 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                onClick={handleDownload}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {isGenerating ? "Generating..." : "Download Resume"}
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
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-accent/30 hover:border-accent/60 hover:bg-accent/5 transition-all duration-200"
              >
                <a href={`mailto:${data.personal.email}`} className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </Button>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2">
              {data.skillChips.map((chip, index) => (
                <Badge
                  key={chip}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm font-medium glass-card border-primary/10 hover:border-primary/30 hover:scale-105 transition-all duration-200 cursor-default opacity-0 animate-slide-up"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  {chip}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right: Professional photo */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start lg:mt-4 opacity-0 animate-slide-in-right" style={{ animationDelay: "300ms" }}>
            <div className="relative group">
              {/* Gradient glow behind the photo */}
              <div className="absolute -inset-1.5 bg-gradient-to-br from-primary to-accent rounded-2xl opacity-50 group-hover:opacity-80 blur-md transition-opacity duration-300" />
              <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden glass-card border-2 border-white/20">
                <img
                  src={PHOTO_URL}
                  alt={`${data.personal.name} professional headshot`}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    const placeholder = (e.target as HTMLImageElement).nextElementSibling;
                    if (placeholder) (placeholder as HTMLElement).style.display = "flex";
                  }}
                />
                {/* Placeholder when no image */}
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 items-center justify-center hidden flex-col gap-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <User className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <span className="text-xs text-muted-foreground/50 font-medium">Add headshot.jpg to /public</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
