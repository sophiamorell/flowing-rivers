import type { Metadata } from "next";
import Link from "next/link";
import { site, ui } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: site.privacy.title,
  description: site.privacy.metaDescription,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

export default function PrivacyPage() {
  const { privacy } = site;
  return (
    <>
      <Header solid />
      <main id="main" className="flex-1 bg-cream pb-20 pt-28 md:pb-28 md:pt-40">
        <Container>
          <article className="max-w-prose">
            <Eyebrow>{site.name}</Eyebrow>
            <h1 className="mt-3 text-4xl md:text-5xl">{privacy.title}</h1>
            <p className="mt-3 text-sm text-river-700">
              {ui.lastUpdated} {privacy.updated}
            </p>
            <p className="mt-8">{privacy.intro}</p>
            {privacy.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <h2 className="text-2xl">{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-4">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="mt-12">
              <Link
                href="/"
                className="rounded font-semibold text-terracotta-700 underline underline-offset-4"
              >
                {ui.backHome}
              </Link>
            </p>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
