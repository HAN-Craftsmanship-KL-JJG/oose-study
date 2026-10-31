import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // The repository root has other lockfiles; this folder is the project root.
  turbopack: { root: import.meta.dirname },
  // A static site in out/, for GitHub Pages.
  output: "export",
  trailingSlash: true,
  // GitHub Pages serves the site under /<repository>/; the deploy workflow sets BASE_PATH.
  basePath: process.env.BASE_PATH ?? "",
  // The search box fetches its index, and fetch() does not add the base path by itself.
  env: { NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH ?? "" },
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings, so Turbopack can serialise them.
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [["rehype-slug"]],
  },
});

export default withMDX(nextConfig);
