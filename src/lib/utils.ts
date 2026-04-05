export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function getScoreColor(score: number): string {
  if (score >= 8.5) return "text-trust-green";
  if (score >= 7.0) return "text-trust-gold-dark";
  if (score >= 5.5) return "text-slate-500";
  return "text-red-400";
}

export function getScoreStroke(score: number): string {
  if (score >= 8.5) return "stroke-trust-green";
  if (score >= 7.0) return "stroke-trust-gold";
  if (score >= 5.5) return "stroke-slate-400";
  return "stroke-red-300";
}

export function getScoreLabel(score: number): string {
  if (score >= 9.5) return "Outstanding";
  if (score >= 9.0) return "Excellent";
  if (score >= 8.0) return "Very Good";
  if (score >= 7.0) return "Good";
  if (score >= 6.0) return "Average";
  return "Below Average";
}
