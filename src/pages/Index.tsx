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
    </>
  );
};

export default Index;
