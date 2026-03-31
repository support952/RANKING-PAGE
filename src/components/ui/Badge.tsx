import { Award, CheckCircle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "verified"
  | "editorsChoice"
  | "rank"
  | "neutral"
  | "gold"
  | "silver"
  | "bronze";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  verified:
    "bg-trust-green/10 text-trust-green-dark border border-trust-green/20",
  editorsChoice:
    "bg-trust-gold/10 text-trust-gold-dark border border-trust-gold/20",
  rank: "bg-navy-900 text-white border-none",
  neutral: "bg-slate-100 text-slate-600 border border-slate-200",
  gold: "bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 text-amber-900 border border-amber-300 shadow-sm shadow-amber-200/50",
  silver: "bg-gradient-to-r from-slate-200 via-white to-slate-200 text-slate-700 border border-slate-300 shadow-sm shadow-slate-200/50",
  bronze: "bg-gradient-to-r from-orange-200 via-amber-100 to-orange-200 text-orange-900 border border-orange-300 shadow-sm shadow-orange-200/50",
};

const variantIcons: Partial<Record<BadgeVariant, React.ReactNode>> = {
  verified: <CheckCircle className="w-3 h-3" aria-hidden="true" />,
  editorsChoice: <Award className="w-3 h-3" aria-hidden="true" />,
  gold: <Trophy className="w-2.5 h-2.5" aria-hidden="true" />,
  silver: <Trophy className="w-2.5 h-2.5" aria-hidden="true" />,
  bronze: <Trophy className="w-2.5 h-2.5" aria-hidden="true" />,
};

export function Badge({ variant, children, className }: BadgeProps) {
  if (variant === "rank") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 rounded-full font-serif text-lg font-bold",
          variantStyles[variant],
          className
        )}
        aria-label={`Rank ${children}`}
      >
        {children}
      </span>
    );
  }

  const isMedal = variant === "gold" || variant === "silver" || variant === "bronze";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        isMedal
          ? "px-2.5 py-0.5 text-[0.6rem] uppercase tracking-wider"
          : "px-2.5 py-0.5 text-caption font-medium",
        variantStyles[variant],
        className
      )}
    >
      {variantIcons[variant]}
      {children}
    </span>
  );
}
