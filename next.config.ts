import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // Empty basePath — user site at hramadhaan.github.io is served from root
  // If deploying to a project site (hramadhaan.github.io/<repo>), set basePath: "/<repo>"
  basePath: "",
  assetPrefix: "",

  // GitHub Pages doesn't support Next.js image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
