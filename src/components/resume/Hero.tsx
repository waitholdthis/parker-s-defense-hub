import { MapPin, Download, Linkedin, Mail } from "lucide-react";
 import { Loader2 } from "lucide-react";
 import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";
 import { useResumeDownload } from "@/hooks/useResumeDownload";

export function Hero() {
  const { data } = useResumeDataContext();
   const { downloadResume, isGenerating } = useResumeDownload();
 
   const handleDownload = () => {
     downloadResume(data);
   };

  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container-wide">
        <div className="max-w-3xl">
          {/* Name and Title */}
          <h1 className="mb-2">{data.personal.name}</h1>
          <p className="text-xl md:text-2xl font-medium text-accent mb-4">
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
           <Button size="lg" className="gap-2" onClick={handleDownload} disabled={isGenerating}>
             {isGenerating ? (
               <Loader2 className="h-4 w-4 animate-spin" />
             ) : (
               <Download className="h-4 w-4" />
             )}
             {isGenerating ? 'Generating...' : 'Download Resume'}
           </Button>
            <Button variant="outline" size="lg" asChild>
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
            <Button variant="outline" size="lg" asChild>
              <a href={`mailto:${data.personal.email}`} className="gap-2">
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </Button>
          </div>

          {/* Skill Chips */}
          <div className="flex flex-wrap gap-2">
            {data.skillChips.map((chip) => (
              <Badge
                key={chip}
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
              >
                {chip}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
