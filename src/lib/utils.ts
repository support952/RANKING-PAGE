export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function getScoreColor(score: number): string {
  if (score >= 9.0) return "text-trust-green";
  if (score >= 8.0) return "text-trust-gold-dark";
  return "text-slate-500";
}

export function getScoreStroke(score: number): string {
  if (score >= 9.0) return "stroke-trust-green";
  if (score >= 8.0) return "stroke-trust-gold";
  return "stroke-slate-400";
}

export function getScoreLabel(score: number): string {
  if (score >= 9.5) return "Outstanding";
  if (score >= 9.0) return "Excellent";
  if (score >= 8.5) return "Very Good";
  if (score >= 8.0) return "Good";
  if (score >= 7.0) return "Above Average";
  return "Average";
}
