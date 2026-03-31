"use client";

import { faqItems } from "@/data/providers";
import { Accordion } from "@/components/ui/Accordion";

export function FAQ() {
  const accordionItems = faqItems.map((item, i) => ({
    value: `faq-${i}`,
    trigger: item.question,
    content: item.answer,
  }));

  return (
    <section
      id="faq"
      className="py-16 md:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Common Questions</p>
          <h2
            id="faq-heading"
            className="font-serif text-display-sm font-bold text-navy-900 text-balance mb-4"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion items={accordionItems} />
        </div>
      </div>
    </section>
  );
}
