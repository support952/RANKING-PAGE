import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "gold";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  showArrow?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  gold: "btn-gold",
};

export function Button({
  variant = "primary",
  showArrow = false,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
      {showArrow && (
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      )}
    </a>
  );
}
