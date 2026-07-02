type LogoProps = {
  onDark?: boolean;
  markSize?: number;
};

export function Logo({ onDark = false, markSize = 30 }: LogoProps) {
  const mark = onDark ? "oklch(0.945 0.030 152)" : "var(--green)";
  const vein = onDark ? "var(--green-deep)" : "var(--paper)";
  const tldClassName = onDark
    ? "font-medium text-[oklch(0.80_0.09_55)]"
    : "text-clay-deep font-medium";

  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g transform="rotate(-7 50 55)">
          <path
            d="M50 34 C 50 22, 54 14, 64 10 C 70 7.5, 76 8, 80 12"
            fill="none"
            stroke={mark}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M50 88 C 44 78, 14 62, 14 38 C 14 24, 24 17, 33 17 C 41 17, 48 24, 50 34 C 52 24, 59 17, 67 17 C 76 17, 86 24, 86 38 C 86 62, 56 78, 50 88 Z"
            fill={mark}
          />
          <path
            d="M50 42 C 49 54, 49 66, 50 82"
            fill="none"
            stroke={vein}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      </svg>
      <span className="font-serif font-semibold tracking-[-0.02em]">
        wolontariat<span className={tldClassName}>.org.pl</span>
      </span>
    </span>
  );
}
