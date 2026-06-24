import type { NextConfig } from "next";

// Na GitHub Pages strona zyje pod /<repo>/, wiec basePath ustawiamy przez env
// tylko w buildzie CI. Lokalnie (dev/build) basePath jest pusty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // GitHub Pages nie ma optymalizatora obrazow Next, wiec serwujemy je 1:1
    unoptimized: true,
  },
};

export default nextConfig;
