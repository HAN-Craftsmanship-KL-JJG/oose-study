import { createHash } from "node:crypto";

/**
 * The file name of the SVG of one diagram. The shared style is part of the hash, so a change
 * to the style draws every diagram again. scripts/render-uml.mjs and lib/uml.ts both use it.
 * @param {string} style
 * @param {string} body
 * @returns {string}
 */
export function umlHash(style, body) {
  return createHash("sha256").update(`${style}\n${body.trim()}`).digest("hex").slice(0, 16);
}
