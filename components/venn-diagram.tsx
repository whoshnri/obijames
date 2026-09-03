export function VennDiagram() {
  const r = 125;
  const top = { cx: 200, cy: 135 };
  const left = { cx: 148, cy: 275 };
  const right = { cx: 262, cy: 275 };
  const center = { cx: 200, cy: 215 };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg md:max-w-xl">
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="leaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(37, 99, 235, 0.22)" />
            <stop offset="100%" stopColor="rgba(37, 99, 235, 0.08)" />
          </linearGradient>
          <linearGradient id="teamGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(201, 168, 76, 0.28)" />
            <stop offset="100%" stopColor="rgba(201, 168, 76, 0.1)" />
          </linearGradient>
          <linearGradient id="orgGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="rgba(15, 31, 61, 0.12)" />
            <stop offset="100%" stopColor="rgba(15, 31, 61, 0.04)" />
          </linearGradient>
        </defs>

        <circle
          cx={top.cx}
          cy={top.cy}
          r={r}
          fill="url(#leaderGrad)"
          stroke="rgba(37, 99, 235, 0.45)"
          strokeWidth=".1"
        />
        <circle
          cx={left.cx}
          cy={left.cy}
          r={r}
          fill="url(#teamGrad)"
          stroke="rgba(201, 168, 76, 0.55)"
          strokeWidth=".1"
        />
        <circle
          cx={right.cx}
          cy={right.cy}
          r={r}
          fill="url(#orgGrad)"
          stroke="rgba(15, 31, 61, 0.25)"
          strokeWidth=".1"
        />

        <text
          x={top.cx}
          y={top.cy - r + 72}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#0f1f3d"
          fontSize="18"
          fontWeight="600"
        >
          The Leader
        </text>
        <text
          x={left.cx - 59}
          y={left.cy + r - 98}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#0f1f3d"
          fontSize="15"
          fontWeight="600"
        >
          The Team
        </text>
        <text
          x={right.cx + 12}
          y={right.cy + r - 98}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#0f1f3d"
          fontSize="15"
          fontWeight="600"
        >
          <tspan x={right.cx + 59} dy="-0.6em">
            The
          </tspan>
          <tspan x={right.cx + 59} dy="1.2em">
            Organisation
          </tspan>
        </text>

        <text
          x={center.cx}
          y={center.cy + 7}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#a8893a"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.16em"
        >
          <tspan x={center.cx  + 7} dy="-0.6em">
            SHARED
          </tspan>
          <tspan x={center.cx  + 7} dy="1.4em">
            LEADERSHIP
          </tspan>
        </text>
      </svg>
    </div>
  );
}
