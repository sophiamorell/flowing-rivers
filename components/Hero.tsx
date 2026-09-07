import Image from "next/image";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { RiverDivider } from "@/components/ui/RiverDivider";

export function Hero() {
  const { hero } = site;
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-cream pb-16 pt-28 md:pb-24 md:pt-40"
    >
      {/* Motif use 1 of 3: the river bleeding off the right edge. */}
      <RiverDivider
        variant="bleed"
        className="pointer-events-none absolute -right-16 top-0 h-full w-[300px] md:-right-8 md:w-[380px] lg:right-[-2%] lg:w-[440px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1
              id="hero-heading"
              className="text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem]"
            >
              {hero.h1}
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink md:text-xl">
              {hero.sub}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
            {/* TODO 3: trust line carries a credentials placeholder until confirmed. */}
            <p className="mt-7 text-sm text-river-700">{hero.trustLine}</p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-sand"
              />
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                priority
              fetchPriority="high"
              decoding="sync"
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 384px, 90vw"
                className="relative aspect-[3/4] h-auto w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
