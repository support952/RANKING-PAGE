"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getScoreColor, getScoreLabel, getScoreStroke } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export function ScoreGauge({
  score,
  size = 72,
  strokeWidth = 4,
  showLabel,
}: ScoreGaugeProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score / 10;
  const dashOffset = circumference * (1 - progress);

  const autoShowLabel = showLabel ?? size >= 64;
  const fontSize = size <= 48 ? "text-xs" : "text-lg";

  return (
    <div
      className="score-ring flex flex-col items-center gap-0.5"
      aria-label={`Score: ${score} out of 10 — ${getScoreLabel(score)}`}
    >
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-slate-100"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: dashOffset }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className={getScoreStroke(score)}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          className={`font-serif ${fontSize} font-bold fill-current ${getScoreColor(score)}`}
        >
          {score}
        </text>
      </svg>
      {autoShowLabel && (
        <span className="text-[0.6rem] text-slate-400 font-medium leading-none">
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
}
