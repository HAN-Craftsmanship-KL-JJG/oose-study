import type { ReactNode } from "react";

// Every symbol is drawn in a 72 × 28 box; lines run along the middle.
const Y = 14;
const STROKE = { stroke: "currentColor", strokeWidth: 1.5 } as const;

type Head = "open" | "filled" | "triangle" | "diamond" | "filledDiamond" | "cross";

// How far the line stops before the tip, so it does not run through an open shape.
const INSET: Record<Head, number> = {
  open: 1,
  filled: 9,
  triangle: 13,
  diamond: 23,
  filledDiamond: 23,
  cross: 5,
};

// A head drawn at the right end, with its tip at x = 70.
function headAtEnd(head: Head): ReactNode {
  const fill = head === "filled" || head === "filledDiamond" ? "currentColor" : "none";
  const props = { ...STROKE, fill, strokeLinejoin: "miter" as const };
  switch (head) {
    case "open":
      return <polyline points="59,8 70,14 59,20" {...props} />;
    case "filled":
      return <polygon points="60,9 70,14 60,19" {...props} />;
    case "triangle":
      return <polygon points="57,7.5 70,14 57,20.5" {...props} />;
    case "diamond":
    case "filledDiamond":
      return <polygon points="47,14 58.5,8.5 70,14 58.5,19.5" {...props} />;
    case "cross":
      return (
        <g {...STROKE}>
          <line x1="59" y1="8" x2="71" y2="20" />
          <line x1="71" y1="8" x2="59" y2="20" />
        </g>
      );
  }
}

/** A line with an optional head at each end. A head at the start is the end head, mirrored. */
export function Relation({
  dashed = false,
  start,
  end,
}: {
  dashed?: boolean;
  start?: Head;
  end?: Head;
}) {
  const x1 = start ? 72 - (70 - INSET[start]) : 1;
  const x2 = end ? 70 - INSET[end] : 71;
  return (
    <>
      <line
        x1={x1}
        y1={Y}
        x2={x2}
        y2={Y}
        {...STROKE}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      {start && <g transform="matrix(-1 0 0 1 72 0)">{headAtEnd(start)}</g>}
      {end && headAtEnd(end)}
    </>
  );
}

export const LINES = {
  line: { label: "Plain line", draw: () => <Relation /> },
  association: { label: "Solid line, open arrow head", draw: () => <Relation end="open" /> },
  composition: {
    label: "Solid line, filled diamond at the whole",
    draw: () => <Relation start="filledDiamond" />,
  },
  aggregation: {
    label: "Solid line, open diamond at the whole",
    draw: () => <Relation start="diamond" />,
  },
  generalization: {
    label: "Solid line, open triangle",
    draw: () => <Relation end="triangle" />,
  },
  realization: {
    label: "Dashed line, open triangle",
    draw: () => <Relation dashed end="triangle" />,
  },
  dependency: {
    label: "Dashed line, open arrow head",
    draw: () => <Relation dashed end="open" />,
  },
  message: { label: "Solid arrow with a filled head", draw: () => <Relation end="filled" /> },
  return: { label: "Dashed arrow back", draw: () => <Relation dashed start="open" /> },
  lost: { label: "Cross at the end of an arrow", draw: () => <Relation end="cross" /> },
};
