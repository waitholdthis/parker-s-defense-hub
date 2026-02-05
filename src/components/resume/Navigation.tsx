import { useState, useEffect } from "react";
 import { Menu, X, Download, Linkedin, Mail } from "lucide-react";
 import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { JobFitAnalyzer } from "./JobFitAnalyzer";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";

const navItems = [
  { href: "#summary", label: "Summary" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#development", label: "Development" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const { data: resumeData } = useResumeDataContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Name/Logo */}
          <a
            href="#"
            className="font-semibold text-lg text-foreground hover:text-accent transition-colors"
          >
            {resumeData?.personal?.name || "Resume"}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <JobFitAnalyzer />
             <ThemeToggle />
            {resumeData?.personal?.linkedin && (
              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {resumeData?.personal?.email && (
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Send Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border pb-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 px-4 pt-4 border-t border-border mt-2">
                <JobFitAnalyzer />
                <div className="flex items-center gap-3">
                   <ThemeToggle />
                  {resumeData?.personal?.linkedin && (
                    <a
                      href={resumeData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {resumeData?.personal?.email && (
                    <a
                      href={`mailto:${resumeData.personal.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Send Email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                  <Button size="sm" className="gap-2 ml-auto">
                    <Download className="h-4 w-4" />
                    Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
