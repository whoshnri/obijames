type ExecutiveDevelopmentIllustrationProps = {
  className?: string;
  tone?: "light" | "dark";
  /** Stretch to cover a banner like a photo (xMidYMid slice). */
  cover?: boolean;
};

export function ExecutiveDevelopmentIllustration({
  className,
  tone = "dark",
  cover = false,
}: ExecutiveDevelopmentIllustrationProps) {
  const isDark = tone === "dark";
  const ink = isDark ? "rgba(251, 245, 223, 0.92)" : "rgba(24, 66, 96, 0.92)";
  const muted = isDark ? "rgba(251, 245, 223, 0.38)" : "rgba(24, 66, 96, 0.35)";
  const soft = isDark ? "rgba(251, 245, 223, 0.12)" : "rgba(24, 66, 96, 0.08)";
  const accent = isDark ? "#fbf5df" : "#184260";
  const fillA = isDark ? "rgba(251, 245, 223, 0.08)" : "rgba(24, 66, 96, 0.06)";
  const fillB = isDark ? "rgba(251, 245, 223, 0.16)" : "rgba(24, 66, 96, 0.12)";

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 640 520"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio={cover ? "xMidYMid slice" : "xMidYMid meet"}
      >
        <defs>
          <radialGradient id="edGlow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor={accent} stopOpacity={isDark ? 0.18 : 0.12} />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="640" height="520" fill="url(#edGlow)" />

        {/* From: dependency hub */}
        <g>
          <text
            x="118"
            y="48"
            fill={muted}
            fontSize="12"
            fontWeight="600"
            letterSpacing="0.18em"
          >
            DEPENDENCY
          </text>
          <circle cx="150" cy="210" r="34" fill={fillB} stroke={ink} strokeWidth="1.5" />
          <circle cx="150" cy="210" r="8" fill={ink} />
          {[
            [78, 112],
            [52, 198],
            [70, 300],
            [150, 112],
            [230, 120],
            [248, 210],
            [230, 300],
            [150, 328],
          ].map(([x, y], i) => (
            <g key={`dep-${i}`}>
              <line
                x1="150"
                y1="210"
                x2={x}
                y2={y}
                stroke={muted}
                strokeWidth="1.25"
              />
              <circle cx={x} cy={y} r="11" fill={fillA} stroke={muted} strokeWidth="1.25" />
            </g>
          ))}
        </g>

        {/* Arc of transformation */}
        <path
          d="M270 210 C330 140, 360 140, 420 210"
          stroke={ink}
          strokeWidth="1.5"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
        <path
          d="M402 188 L424 210 L398 220"
          stroke={ink}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* To: distributed capability */}
        <g>
          <text
            x="430"
            y="48"
            fill={muted}
            fontSize="12"
            fontWeight="600"
            letterSpacing="0.18em"
          >
            CAPABILITY
          </text>

          {[
            [470, 140],
            [560, 160],
            [510, 220],
            [590, 240],
            [450, 270],
            [540, 300],
            [480, 350],
            [575, 360],
          ].map(([x, y], i) => (
            <circle
              key={`cap-node-${i}`}
              cx={x}
              cy={y}
              r={i === 2 ? 16 : 12}
              fill={i === 2 ? fillB : fillA}
              stroke={i === 2 ? ink : muted}
              strokeWidth="1.35"
            />
          ))}

          {[
            [470, 140, 560, 160],
            [470, 140, 510, 220],
            [560, 160, 510, 220],
            [560, 160, 590, 240],
            [510, 220, 450, 270],
            [510, 220, 540, 300],
            [510, 220, 590, 240],
            [450, 270, 480, 350],
            [540, 300, 480, 350],
            [540, 300, 575, 360],
            [590, 240, 575, 360],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={`cap-edge-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={soft}
              strokeWidth="1.5"
            />
          ))}

          <circle cx="510" cy="220" r="5" fill={ink} />
        </g>

        {/* Grounding labels */}
        <text
          x="92"
          y="420"
          fill={muted}
          fontSize="13"
          fontWeight="500"
        >
          One leader holds the centre
        </text>
        <text
          x="408"
          y="420"
          fill={muted}
          fontSize="13"
          fontWeight="500"
        >
          Leadership multiplies outward
        </text>

        <line x1="80" y1="448" x2="560" y2="448" stroke={soft} strokeWidth="1" />
        <text
          x="320"
          y="482"
          textAnchor="middle"
          fill={ink}
          fontSize="14"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          FROM CONTROL TO STEWARDSHIP
        </text>
      </svg>
    </div>
  );
}
