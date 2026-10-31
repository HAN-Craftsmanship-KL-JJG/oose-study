import { buildSearchIndex } from "@/lib/search-index";

// Written once at build time to out/search-index.json.
export const dynamic = "force-static";

export async function GET() {
  return Response.json(await buildSearchIndex());
}
