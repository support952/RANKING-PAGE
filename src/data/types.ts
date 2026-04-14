export interface ProviderSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number; // 1-5
  title: string;
  body: string;
  date: string;
  verified: boolean;
  invited: boolean;
}

export interface RatingDistribution {
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

export interface Provider {
  id: string;
  rank: number;
  name: string;
  slug: string;
  logo?: string;
  tagline: string;
  expertVerdict: string;
  aiSummary: string;
  score: number; // 1-5 scale
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
  reviewCount: number;
  ratingDistribution: RatingDistribution;
  contact: ContactInfo;
  reviews: Review[];
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
