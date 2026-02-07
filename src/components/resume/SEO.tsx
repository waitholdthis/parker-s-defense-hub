import { Helmet } from "react-helmet-async";
import { useResumeDataContext } from "@/contexts/ResumeDataContext";

export function SEO() {
  const { data } = useResumeDataContext();
  const { personal, skillChips, executiveSummary } = data;

  const title = `${personal.name} | ${personal.title} - CWMD, CBRN, Homeland Security Expert`;
  const description = executiveSummary[0] || 
    `${personal.name} is a ${personal.title} with expertise in CWMD, CBRN Defense, Homeland Security, and Emergency Management. Based in ${personal.location}.`;
  const keywords = [
    ...skillChips,
    personal.name,
    personal.title,
    "Warrant Officer",
    "Defense",
    "National Security",
    "DoD",
    "DHS",
  ].join(", ");

  // Schema.org structured data for Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    worksFor: {
      "@type": "Organization",
      name: personal.organization,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: personal.location,
    },
    sameAs: [personal.linkedin],
    knowsAbout: skillChips,
  };

  // Schema.org structured data for Resume
  const resumeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    mainEntity: {
      "@type": "Person",
      name: personal.name,
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={personal.name} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(resumeSchema)}</script>
    </Helmet>
  );
}
