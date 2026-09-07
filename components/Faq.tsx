import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * Native <details>/<summary>: keyboard-operable, printable, no JS.
 */
export function Faq() {
  const { faq } = site;
  return (
    <Section id="faq" labelledBy="faq-heading" tone="sand">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-heading" eyebrow={faq.eyebrow}>
            {faq.heading}
          </SectionHeading>
        </div>
        <div className="lg:col-span-8">
          {faq.items.map((item, i) => (
            <details
              key={item.question}
              className="group border-b border-river-300/40 py-5 first:border-t"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded [&::-webkit-details-marker]:hidden">
                <h3 className="text-xl leading-snug">{item.question}</h3>
                <ChevronDown
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.75}
                  className="mt-1 shrink-0 text-terracotta-500 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              {/* TODO 16: answers 4 and 6 contain assumptions to confirm. */}
              <p className="mt-3 max-w-prose pr-8 text-[17px]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
