import { readUml } from "@/lib/uml";
import UmlFigure from "./UmlFigure";

/** A PlantUML diagram. scripts/render-uml.mjs draws the SVG before the build. */
export default async function Uml({ source }: { source: string }) {
  const { svg, minWidth } = await readUml(source);
  return <UmlFigure svg={svg} minWidth={minWidth} />;
}
