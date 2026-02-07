import { useResumeDataContext } from "@/contexts/ResumeDataContext";

export function Footer() {
  const { data } = useResumeDataContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8">
      {/* Gradient top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8" />
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} {data.personal.name}. All rights reserved.
          </p>
          <p className="gradient-text font-medium">
            Built with purpose for mission-focused careers.
          </p>
        </div>
      </div>
    </footer>
  );
}
