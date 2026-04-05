"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  value: string;
  trigger: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={cn("space-y-3", className)}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.value}
          value={item.value}
          className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card transition-all data-[state=open]:shadow-card-hover data-[state=open]:border-slate-200"
        >
          <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-serif text-lg font-semibold text-navy-900 hover:bg-slate-50/50 transition-colors">
            <span>{item.trigger}</span>
            <ChevronDown
              className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
            <div className="px-6 pb-6 text-base text-slate-600 leading-relaxed">
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
