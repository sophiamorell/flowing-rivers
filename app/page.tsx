import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Faq } from "@/components/Faq";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { localBusinessJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  const jsonLd = localBusinessJsonLd();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Services />
        {/* TODO 15: <Testimonials /> goes here (E-24). Blocked until written permission,
            parental consent for the two minors, and the peer-coach / HRV-claim questions
            are resolved. See TODO.md. */}
        <HowItWorks />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
