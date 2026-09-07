import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { RiverDivider } from "@/components/ui/RiverDivider";

export function HowItWorks() {
  const { howItWorks } = site;
  return (
    <>
      {/* Motif use 2 of 3 */}
      <RiverDivider className="bg-cream" />
      <Section id="how-it-works" labelledBy="how-heading" className="!pt-10 md:!pt-14">
        <SectionHeading id="how-heading" eyebrow={howItWorks.eyebrow}>
          {howItWorks.heading}
        </SectionHeading>
        <p className="mt-4 max-w-prose">{howItWorks.intro}</p>

        {/* TODO 10: step 1 assumes a free intro call. */}
        <ol
          className="relative mt-12 grid gap-10 before:absolute before:bottom-2 before:left-[22px] before:top-2 before:w-px before:bg-river-300 md:grid-cols-3 md:gap-10 md:before:bottom-auto md:before:left-0 md:before:right-0 md:before:top-6 md:before:h-px md:before:w-auto"
        >
          {howItWorks.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 60} className="relative pl-16 md:pl-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 inline-block bg-cream pb-2 pr-3 font-serif text-5xl leading-none text-terracotta-500 md:static md:pr-6"
              >
                {i + 1}
              </span>
              <h3 className="text-xl md:mt-4">{step.title}</h3>
              <p className="mt-2 max-w-[36ch] text-[16px] leading-relaxed">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
