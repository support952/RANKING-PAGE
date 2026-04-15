interface AuthorityStarsProps {
  score: number;     // 1-5 scale
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { star: 16, gap: 1, text: "text-xs", badge: "text-xs px-1.5 py-0.5" },
  md: { star: 20, gap: 1.5, text: "text-sm", badge: "text-sm px-2 py-0.5" },
  lg: { star: 24, gap: 2, text: "text-base", badge: "text-base px-2.5 py-1" },
};

function getStarColor(score: number): { bg: string; fill: string } {
  if (score >= 4.0) return { bg: "#00B67A", fill: "#FFFFFF" };
  if (score >= 3.0) return { bg: "#73CF11", fill: "#FFFFFF" };
  if (score >= 2.0) return { bg: "#FFCE00", fill: "#FFFFFF" };
  if (score >= 1.0) return { bg: "#FF8622", fill: "#FFFFFF" };
  return { bg: "#DCDCE6", fill: "#FFFFFF" };
}

function getBadgeColor(score: number): string {
  if (score >= 4.0) return "bg-emerald-600 text-white";
  if (score >= 3.0) return "bg-lime-500 text-white";
  if (score >= 2.0) return "bg-amber-400 text-navy-900";
  return "bg-orange-500 text-white";
}

export function AuthorityStars({ score, showScore = true, size = "md" }: AuthorityStarsProps) {
  const { star: starSize, badge } = sizeMap[size];
  const { bg, fill } = getStarColor(score);
  const emptyBg = "#DCDCE6";

  return (
    <div className="inline-flex items-center" style={{ gap: "6px" }}>
      <div className="inline-flex" style={{ gap: "2px" }} aria-label={`Score: ${score} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => {
          const fillAmount = Math.min(Math.max(score - (i - 1), 0), 1);
          return (
            <div
              key={i}
              className="relative"
              style={{ width: starSize, height: starSize }}
            >
              {/* Empty star */}
              <svg viewBox="0 0 24 24" width={starSize} height={starSize} aria-hidden="true">
                <rect width="24" height="24" rx="2" fill={emptyBg} />
                <path
                  d="M12 3.5l2.47 5.01 5.53.8-4 3.9.94 5.49L12 16.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8z"
                  fill={fill}
                />
              </svg>
              {/* Filled star overlay */}
              {fillAmount > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillAmount * 100}%` }}
                >
                  <svg viewBox="0 0 24 24" width={starSize} height={starSize} aria-hidden="true">
                    <rect width="24" height="24" rx="2" fill={bg} />
                    <path
                      d="M12 3.5l2.47 5.01 5.53.8-4 3.9.94 5.49L12 16.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8z"
                      fill={fill}
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showScore && (
        <span className={`${badge} font-bold rounded ${getBadgeColor(score)}`}>
          {score.toFixed(1)}
        </span>
      )}
    </div>
  );
}
