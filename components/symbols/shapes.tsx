const STROKE = { stroke: "currentColor", strokeWidth: 1.5, fill: "none" } as const;
const FILL = { fill: "currentColor" } as const;

// Activity diagram and component diagram symbols, each in a 72 × 28 box.

export const ACTIVITY = {
  start: { label: "Filled circle", draw: () => <circle cx="36" cy="14" r="6" {...FILL} /> },
  action: {
    label: "Rounded box",
    draw: () => <rect x="12" y="5" width="48" height="18" rx="7" {...STROKE} />,
  },
  decision: {
    label: "Diamond",
    draw: () => <polygon points="36,3 47,14 36,25 25,14" {...STROKE} />,
  },
  fork: {
    label: "Thick bar",
    draw: () => <rect x="12" y="11.5" width="48" height="5" {...FILL} />,
  },
  end: {
    label: "Circle with a dot",
    draw: () => (
      <>
        <circle cx="36" cy="14" r="8" {...STROKE} />
        <circle cx="36" cy="14" r="4.5" {...FILL} />
      </>
    ),
  },
};

export const COMPONENT = {
  component: {
    label: "Box with a component icon",
    draw: () => (
      <g {...STROKE} strokeWidth={1.25}>
        <rect x="14" y="3" width="44" height="22" />
        <path d="M46 9 V7 H54 V17 H46 V15.5 M46 13 V11.5" />
        <rect x="43.5" y="9" width="5" height="2.5" />
        <rect x="43.5" y="13" width="5" height="2.5" />
      </g>
    ),
  },
  provided: {
    label: "Circle on a stick (lollipop)",
    draw: () => (
      <g {...STROKE}>
        <line x1="4" y1="14" x2="54" y2="14" />
        <circle cx="61" cy="14" r="7" />
      </g>
    ),
  },
  required: {
    label: "Half circle on a stick (socket)",
    draw: () => (
      <g {...STROKE}>
        <line x1="4" y1="14" x2="59" y2="14" />
        <path d="M68 5 A9 9 0 0 0 68 23" />
      </g>
    ),
  },
  assembly: {
    label: "Socket around a lollipop",
    draw: () => (
      <g {...STROKE}>
        <line x1="2" y1="14" x2="29" y2="14" />
        <circle cx="35" cy="14" r="6" />
        <path d="M35 5 A9 9 0 0 1 35 23" />
        <line x1="44" y1="14" x2="70" y2="14" />
      </g>
    ),
  },
};
