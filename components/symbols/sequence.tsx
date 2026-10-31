const STROKE = { stroke: "currentColor", strokeWidth: 1.5, fill: "none" } as const;
const DASH = "3 2.5";

function Text({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} fontSize="7.5" textAnchor="middle" fill="currentColor" stroke="none">
      {children}
    </text>
  );
}

// A participant box at the top with its dashed lifeline below.
function Participant({ label }: { label?: string | undefined }) {
  return (
    <g {...STROKE}>
      <rect x="14" y="1" width="44" height="13" />
      {label !== undefined && (
        <Text x={36} y={10.5}>
          {label}
        </Text>
      )}
      <line x1="36" y1="14" x2="36" y2="27" strokeDasharray={DASH} />
    </g>
  );
}

// A frame with its operator in the tab at the top left, such as "loop".
function Frame({ label = "loop" }: { label?: string | undefined }) {
  return (
    <g {...STROKE} strokeWidth={1}>
      <rect x="1" y="1" width="70" height="26" />
      <path d="M1 11 H24 L29 6 V1" />
      <Text x={12.5} y={8.5}>
        {label}
      </Text>
      {label === "alt" && <line x1="1" y1="19" x2="71" y2="19" strokeDasharray={DASH} />}
    </g>
  );
}

export const SEQUENCE = {
  actor: {
    label: "Stick figure",
    draw: () => (
      <g {...STROKE} strokeWidth={1.25}>
        <circle cx="36" cy="5" r="3.5" />
        <path d="M36 8.5 V18 M29.5 12 H42.5 M36 18 L31 26.5 M36 18 L41 26.5" />
      </g>
    ),
  },
  participant: {
    label: "Box at the top, with a dashed line below",
    draw: (label?: string) => <Participant label={label} />,
  },
  lifeline: {
    label: "Dashed vertical line",
    draw: () => <line x1="36" y1="1" x2="36" y2="27" {...STROKE} strokeDasharray={DASH} />,
  },
  activation: {
    label: "Thin bar on a lifeline",
    draw: () => (
      <g {...STROKE}>
        <path d="M36 1 V5 M36 23 V27" strokeDasharray={DASH} />
        <rect x="32" y="5" width="8" height="18" />
      </g>
    ),
  },
  create: {
    label: "Arrow to a box lower down, not at the top",
    draw: () => (
      <g {...STROKE}>
        <line x1="1" y1="11" x2="43" y2="11" />
        <polyline points="34,6 44,11 34,16" />
        <rect x="45" y="4" width="26" height="14" />
        <line x1="58" y1="18" x2="58" y2="27" strokeDasharray={DASH} />
      </g>
    ),
  },
  self: {
    label: "Arrow from a lifeline to itself",
    draw: () => (
      <g {...STROKE}>
        <line x1="22" y1="1" x2="22" y2="27" strokeDasharray={DASH} />
        <path d="M22 7 H52 V21 H23" />
        <polygon points="23,21 32,17 32,25" fill="currentColor" />
      </g>
    ),
  },
  frame: {
    label: "Frame with its operator in the top left corner",
    draw: (label?: string) => <Frame label={label} />,
  },
};
