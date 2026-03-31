export interface ProviderSpec {
  label: string;
  value: string;
}

export interface Provider {
  id: string;
  rank: number;
  name: string;
  slug: string;
  logo?: string;
  tagline: string;
  expertVerdict: string;
  score: number;
  editorsChoice: boolean;
  premium: boolean;
  specs: ProviderSpec[];
  pros: string[];
  cons: string[];
  ctaLabel: string;
  ctaUrl: string;
  yearFounded?: number;
  headquartersCity?: string;
  bbRating?: string;
  trustpilotScore?: number;
}

export interface AuditEntry {
  date: string;
  action: string;
  reviewer: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
