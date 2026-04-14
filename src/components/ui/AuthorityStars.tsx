interface AuthorityStarsProps {
  score: number;     // 1-5 scale
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { star: 14, gap: 1, text: "text-xs" },
  md: { star: 18, gap: 1.5, text: "text-sm" },
  lg: { star: 22, gap: 2, text: "text-base" },
};

export function AuthorityStars({ score, showScore = true, size = "md" }: AuthorityStarsProps) {
  const { star: starSize, gap, text } = sizeMap[size];

  return (
    <div className="inline-flex items-center" style={{ gap: `${gap * 4}px` }}>
      <div className="inline-flex" style={{ gap: "1.5px" }} aria-label={`Score: ${score} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.min(Math.max(score - (i - 1), 0), 1);
          return (
            <div
              key={i}
              className="relative"
              style={{ width: starSize, height: starSize }}
            >
              {/* Empty star background */}
              <svg
                viewBox="0 0 24 24"
                width={starSize}
                height={starSize}
                aria-hidden="true"
              >
                <rect width="24" height="24" rx="1.5" fill="#DCDCE6" />
                <path
                  d="M12 3.5l2.47 5.01 5.53.8-4 3.9.94 5.49L12 16.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8z"
                  fill="#FFF"
                />
              </svg>
              {/* Filled star overlay */}
              {fill > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={starSize}
                    height={starSize}
                    aria-hidden="true"
                  >
                    <rect width="24" height="24" rx="1.5" fill="#C9A84C" />
                    <path
                      d="M12 3.5l2.47 5.01 5.53.8-4 3.9.94 5.49L12 16.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8z"
                      fill="#FFF"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showScore && (
        <span className={`${text} font-bold text-navy-900`}>{score}</span>
      )}
    </div>
  );
}
