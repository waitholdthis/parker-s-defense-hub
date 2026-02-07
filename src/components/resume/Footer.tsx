import { useResumeDataContext } from "@/contexts/ResumeDataContext";

export function Footer() {
  const { data } = useResumeDataContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} {data.personal.name}. All rights reserved.
          </p>
          <p>
            Built with purpose for mission-focused careers.
          </p>
        </div>
      </div>
    </footer>
  );
}
