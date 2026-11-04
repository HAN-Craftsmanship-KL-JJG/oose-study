import fs from "node:fs/promises";
import path from "node:path";
import { umlHash } from "./uml-hash.mjs";

const UML_DIR = path.join(process.cwd(), "uml");
const style = fs.readFile(path.join(UML_DIR, "style.puml"), "utf8");

/** A drawn diagram, ready for <UmlFigure>. */
export interface UmlSvg {
  svg: string;
  /** Shrink a wide diagram to fit, but never below 75% of its size: then it scrolls sideways. */
  minWidth: number;
}

/** Reads the SVG that scripts/render-uml.mjs drew for this PlantUML source. Runs on the server. */
export async function readUml(source: string): Promise<UmlSvg> {
  const hash = umlHash(await style, source);
  let svg: string;
  try {
    svg = await fs.readFile(path.join(UML_DIR, "svg", `${hash}.svg`), "utf8");
  } catch {
    throw new Error(`No SVG for this diagram. Run: npm run uml\n${source}`);
  }
  const width = Number(/width="([\d.]+)px"/.exec(svg)?.[1] ?? 0);
  return { svg, minWidth: Math.round(width * 0.75) };
}
