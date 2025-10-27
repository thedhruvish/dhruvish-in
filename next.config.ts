import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [new URL("https://github.com/thedhruvish.png")],
    unoptimized: true,
  },
};

export default nextConfig;
