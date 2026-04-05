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
      className="py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="container-narrow">
        <div className="text-center mb-14">
          <p className="section-label mb-4">Common Questions</p>
          <h2
            id="faq-heading"
            className="font-serif text-3xl md:text-4xl font-bold text-navy-900 text-balance mb-5"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our ranking process and the
            providers we evaluate.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion items={accordionItems} />
        </div>
      </div>
    </section>
  );
}
