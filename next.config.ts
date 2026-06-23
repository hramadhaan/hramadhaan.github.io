import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "hramadhaan.github.io",
  assetPrefix: "hramadhaan.github.io",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
