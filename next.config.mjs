/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "production" ? "standalone" : undefined,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/kosmo/home",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3003",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "smeq-dev.meucorp.com",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "case-smq.vn",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "case-smq.vn",
        pathname: "/_next/image/**",
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "https://kosma-admin.vercel.app/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
