import type { NextConfig } from "next";

const apiProxyTarget = process.env.API_PROXY_TARGET ?? "http://141.94.209.167/api";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path((?!beta-signup$|feedback$|verify-beta$).*)",
          destination: `${apiProxyTarget}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
