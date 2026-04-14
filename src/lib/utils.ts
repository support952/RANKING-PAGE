export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function getScoreColor(score: number): string {
  if (score >= 4.5) return "text-trust-green";
  if (score >= 3.5) return "text-trust-gold-dark";
  if (score >= 2.5) return "text-slate-500";
  return "text-red-400";
}

export function getScoreStroke(score: number): string {
  if (score >= 4.5) return "stroke-trust-green";
  if (score >= 3.5) return "stroke-trust-gold";
  if (score >= 2.5) return "stroke-slate-400";
  return "stroke-red-300";
}

export function getScoreLabel(score: number): string {
  if (score >= 4.8) return "Outstanding";
  if (score >= 4.5) return "Excellent";
  if (score >= 4.0) return "Very Good";
  if (score >= 3.5) return "Good";
  if (score >= 3.0) return "Average";
  return "Below Average";
}
