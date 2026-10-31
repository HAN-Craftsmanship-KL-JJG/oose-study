import fs from "node:fs/promises";
import path from "node:path";
import { umlHash } from "@/lib/uml-hash.mjs";

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
  return (
    <figure
      style={{ ["--uml-min" as string]: `${String(Math.round(width * 0.75))}px` }}
      className="uml not-prose my-8 overflow-x-auto rounded-sm border border-stone-200 bg-[#fffdf8] p-5 dark:border-stone-800 dark:bg-stone-900"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
