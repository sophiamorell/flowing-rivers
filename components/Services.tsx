import type { ComponentType } from "react";
import {
  ArrowRight,
  Brain,
  Flower,
  Heart,
  PersonStanding,
  Sun,
  Trees,
  type LucideProps,
} from "lucide-react";
import { site, type DimensionKey } from "@/content/site";
import { Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<DimensionKey, ComponentType<LucideProps>> = {
  mind: Brain,
  body: PersonStanding,
  spirit: Sun,
  environment: Trees,
  emotions: Heart,
  sexuality: Flower,
};

export function Services() {
  const { services } = site;
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-20"
    >
      {/* Intro + the six dimensions on cream */}
      <div className="bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading id="services-heading" eyebrow={services.eyebrow}>
            {services.heading}
          </SectionHeading>
          <p className="mt-6 max-w-prose">{services.intro}</p>

          <Reveal as="figure" className="mt-10 max-w-3xl border-l-2 border-terracotta-500 pl-6">
            <blockquote className="font-serif text-xl leading-snug text-navy-700 md:text-2xl">
              <p>{services.quote.text}</p>
            </blockquote>
            <figcaption className="mt-3 text-sm text-river-700">
              {services.quote.attribution}
            </figcaption>
          </Reveal>

          <h3 className="mt-16 text-2xl md:text-3xl">{services.dimensionsHeading}</h3>
          <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {services.dimensions.map((d, i) => {
              const Icon = icons[d.key];
              return (
                <Reveal as="li" key={d.key} delay={i * 60} className="flex gap-4">
                  <Icon
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-terracotta-500"
                  />
                  <div>
                    <h4 className="text-xl">{d.label}</h4>
                    <p className="mt-1 text-[16px] leading-relaxed">{d.gloss}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </div>

      {/* Offer cards on sand */}
      <div className="bg-sand py-20 md:py-24">
        <Container>
          <h3 className="text-2xl md:text-3xl">{services.offersHeading}</h3>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.offers.map((o, i) => (
              <Reveal
                as="li"
                key={o.title}
                delay={i * 60}
                className="flex flex-col rounded-2xl border border-river-300/40 bg-cream p-6 md:p-7 lg:p-6"
              >
                <h4 className="text-[1.35rem] leading-snug">{o.title}</h4>
                <p className="mt-2 text-sm text-river-700">
                  {o.length} · {o.format}
                </p>
                {/* TODO 4 / TODO 16: price is one plain string; no currency assumptions. */}
                <p className="mt-4 font-serif text-[1.35rem] leading-snug text-navy-700">{o.price}</p>
                <p className="mt-4 text-[16px] leading-relaxed">{o.description}</p>
                <a
                  href={o.cta.href}
                  className="mt-6 inline-flex items-center gap-1.5 self-start rounded font-semibold text-terracotta-700 transition-colors hover:text-terracotta-600"
                >
                  {o.cta.label}
                  <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
                </a>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-sm text-river-700">{services.offersNote}</p>
          {/* E-23. TODO 17 (scope), TODO 29 (sentence case, not all caps). */}
          <p className="mt-2 font-medium text-navy-700">{services.discountNote}</p>
        </Container>
      </div>
    </section>
  );
}
