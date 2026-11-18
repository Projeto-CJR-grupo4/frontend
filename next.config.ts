import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
        {
            protocol: "http",
            hostname: "localhost",
            port: "3001",
            pathname: "/uploads/lojas/**",
        },
    ],
},
};

export default nextConfig;
