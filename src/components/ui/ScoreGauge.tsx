"use client";

import { getScoreColor, getScoreStroke } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: number;
}

export function ScoreGauge({ score, size = 44 }: ScoreGaugeProps) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 10;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      className="shrink-0"
      aria-label={`Score: ${score} out of 10`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-slate-100"
        />
        {/* Progress circle - starts from top */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className={getScoreStroke(score)}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
        {/* Score text - NOT rotated */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          className={`text-xs font-bold fill-current ${getScoreColor(score)}`}
          style={{ fontFamily: "var(--font-merriweather), Georgia, serif" }}
        >
          {score}
        </text>
      </svg>
    </div>
  );
}
