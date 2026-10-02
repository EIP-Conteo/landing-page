import type { NextConfig } from "next";

const apiProxyTarget = process.env.API_PROXY_TARGET ?? "http://141.94.209.167/api";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "conteo-landing.vercel.app",
          },
        ],
        destination: "https://www.conteo.xyz/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path((?!beta-signup$|feedback$|verify-beta$|admin/.*).*)",
          destination: `${apiProxyTarget}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
