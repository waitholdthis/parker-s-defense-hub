import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import resumeData from "@/data/resume.json";

const typeIcons = {
  degree: GraduationCap,
  certificate: Award,
  education: BookOpen,
  professional_development: BookOpen,
};

const statusColors = {
  Completed: "bg-proficiency-advanced text-white",
  "In Progress": "bg-proficiency-working text-white",
  Planned: "bg-muted text-muted-foreground",
};

export function Education() {
  return (
    <section id="education" className="section">
      <div className="container-wide">
        <h2 className="mb-8">Education & Professional Development</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {resumeData.education.map((item) => {
            const Icon = typeIcons[item.type as keyof typeof typeIcons] || BookOpen;
            const statusClass = statusColors[item.status as keyof typeof statusColors] || statusColors.Planned;

            return (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <Badge className={`flex-shrink-0 text-xs ${statusClass}`}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-accent font-medium text-sm mb-2">
                      {item.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-1">
                        {item.status === "Completed" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {item.completionDate}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Certifications</h3>
            <div className="flex flex-wrap gap-4">
              {resumeData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg px-4 py-3"
                >
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
