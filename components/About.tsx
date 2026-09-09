import Image from "next/image";
import { site } from "@/content/site";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { about } = site;
  return (
    <Section id="about" labelledBy="about-heading" tone="sand">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full rounded-2xl border border-river-300/40 bg-cream"
            />
            {/* TODO 7: headshot is below the 1600px bar; ask for the original. */}
            <Image
              src={about.image.src}
              alt={about.image.alt}
              width={about.image.width}
              height={about.image.height}
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 384px, 90vw"
              className="relative aspect-[4/5] h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={60}>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 id="about-heading" className="mt-3 text-3xl md:text-4xl">
            {about.heading}
          </h2>
          <div className="mt-6 max-w-prose space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            {/* E-11: intro line + quiet list, inside the first-person copy. TODO 28 on wording. */}
            <p>{about.focus.intro}</p>
            <ul className="list-disc space-y-1 pl-6 marker:text-terracotta-500">
              {about.focus.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {about.closing.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-8">
            <Eyebrow className="text-river-700">{about.credentialsEyebrow}</Eyebrow>
            {/* E-14: verbatim credentials. TODO 22 on the 2026 certificate. */}
            <ul className="mt-3 space-y-1.5 text-[15px] text-river-700">
              {about.credentials.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-500" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
