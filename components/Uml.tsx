import fs from "node:fs/promises";
import path from "node:path";
import { umlHash } from "@/lib/uml-hash.mjs";
import UmlFigure from "./UmlFigure";

const UML_DIR = path.join(process.cwd(), "uml");
const style = fs.readFile(path.join(UML_DIR, "style.puml"), "utf8");

/** A PlantUML diagram. scripts/render-uml.mjs draws the SVG before the build. */
export default async function Uml({ source }: { source: string }) {
  const hash = umlHash(await style, source);
  let svg: string;
  try {
    svg = await fs.readFile(path.join(UML_DIR, "svg", `${hash}.svg`), "utf8");
  } catch {
    throw new Error(`No SVG for this diagram. Run: npm run uml\n${source}`);
  }
  // Shrink a wide diagram to fit, but never below 75% of its size: then it scrolls sideways.
  const width = Number(/width="([\d.]+)px"/.exec(svg)?.[1] ?? 0);
  return <UmlFigure svg={svg} minWidth={Math.round(width * 0.75)} />;
}
