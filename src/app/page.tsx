import { Hero } from "@/components/sections/Hero";
import { ComparisonList } from "@/components/sections/ComparisonList";
import { Methodology } from "@/components/sections/Methodology";
import { AuditTrail } from "@/components/sections/AuditTrail";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <ComparisonList />
      <Methodology />
      <AuditTrail />
      <FAQ />
    </>
  );
}
