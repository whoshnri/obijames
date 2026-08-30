export function VennDiagram() {
  const r = 90;
  const top = { cx: 200, cy: 162 };
  const left = { cx: 160, cy: 244 };
  const right = { cx: 240, cy: 244 };
  const center = { cx: 200, cy: 208 };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg md:max-w-xl">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="leaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(37, 99, 235, 0.35)" />
            <stop offset="100%" stopColor="rgba(37, 99, 235, 0.12)" />
          </linearGradient>
          <linearGradient id="teamGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(201, 168, 76, 0.35)" />
            <stop offset="100%" stopColor="rgba(201, 168, 76, 0.12)" />
          </linearGradient>
          <linearGradient id="orgGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.3)" />
            <stop offset="100%" stopColor="rgba(148, 163, 184, 0.1)" />
          </linearGradient>
        </defs>

        <circle
          cx={top.cx}
          cy={top.cy}
          r={r}
          fill="url(#leaderGrad)"
          stroke="rgba(37, 99, 235, 0.5)"
          strokeWidth="1.5"
        />
        <circle
          cx={left.cx}
          cy={left.cy}
          r={r}
          fill="url(#teamGrad)"
          stroke="rgba(201, 168, 76, 0.5)"
          strokeWidth="1.5"
        />
        <circle
          cx={right.cx}
          cy={right.cy}
          r={r}
          fill="url(#orgGrad)"
          stroke="rgba(148, 163, 184, 0.45)"
          strokeWidth="1.5"
        />

        <text
          x={top.cx}
          y={top.cy - r + 28}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="15"
          fontWeight="600"
        >
          The Leader
        </text>
        <text
          x={left.cx}
          y={left.cy + r - 28}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="15"
          fontWeight="600"
        >
          The Team
        </text>
        <text
          x={right.cx}
          y={right.cy + r - 28}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize="15"
          fontWeight="600"
        >
          <tspan x={right.cx} dy="0">
            The
          </tspan>
          <tspan x={right.cx} dy="1.2em">
            Organisation
          </tspan>
        </text>

        <text
          x={center.cx}
          y={center.cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(201, 168, 76, 0.95)"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.12em"
        >
          <tspan x={center.cx} dy="-0.75em">
            SHARED
          </tspan>
          <tspan x={center.cx} dy="1.65em">
            LEADERSHIP
          </tspan>
        </text>
      </svg>
    </div>
  );
}
