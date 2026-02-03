import {
  Navigation,
  Hero,
  ExecutiveSummary,
  Skills,
  Experience,
  Education,
  Projects,
  Development,
  Contact,
  Footer,
  SEO,
  AskParker,
} from "@/components/resume";
import { ResumeDataProvider } from "@/contexts/ResumeDataContext";

const Index = () => {
  return (
    <ResumeDataProvider>
      <SEO />
      <Navigation />
      <main>
        <Hero />
        <ExecutiveSummary />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Development />
        <Contact />
      </main>
      <Footer />
      <AskParker />
    </ResumeDataProvider>
  );
};

export default Index;
