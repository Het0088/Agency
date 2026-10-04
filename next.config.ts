import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/admin',
          destination: '/admin-cms.html',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
};

export default nextConfig;
