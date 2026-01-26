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

const Index = () => {
  return (
    <>
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
    </>
  );
};

export default Index;
