interface USFlagIconProps {
  size?: number;
  className?: string;
}

export function USFlagIcon({ size = 32, className }: USFlagIconProps) {
  const height = (size * 22) / 32;

  // 5-pointed star path centered at origin, radius ~1
  const star = (cx: number, cy: number, r: number) => {
    const points: string[] = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return `M${points[0]}L${points[1]}L${points[2]}L${points[3]}L${points[4]}Z`;
  };

  // 3x3 grid of stars in the canton
  const stars: { cx: number; cy: number }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      stars.push({
        cx: 2.4 + col * 3.2,
        cy: 2.4 + row * 3.2,
      });
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 22"
      width={size}
      height={height}
      className={className}
      aria-hidden="true"
    >
      {/* Stripes — 7 stripes alternating red/white */}
      {Array.from({ length: 7 }, (_, i) => (
        <rect
          key={i}
          x={0}
          y={(i * 22) / 7}
          width={32}
          height={22 / 7}
          fill={i % 2 === 0 ? "#BF0A30" : "#FFFFFF"}
        />
      ))}

      {/* Blue canton */}
      <rect x={0} y={0} width={12.8} height={12.6} fill="#002868" />

      {/* Stars */}
      {stars.map((s, i) => (
        <path key={i} d={star(s.cx, s.cy, 1.1)} fill="#FFFFFF" fillRule="evenodd" />
      ))}
    </svg>
  );
}
