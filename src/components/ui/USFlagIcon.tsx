import Image from "next/image";

interface USFlagIconProps {
  size?: number;
  className?: string;
}

export function USFlagIcon({ size = 32, className }: USFlagIconProps) {
  return (
    <Image
      src="/us-flag.svg"
      alt=""
      width={size}
      height={Math.round(size * 0.526)}
      className={className}
      aria-hidden="true"
      priority
    />
  );
}
