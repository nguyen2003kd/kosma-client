const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN ?? '';
const isLocalBackend =
  backendDomain.startsWith('http://localhost') || backendDomain.startsWith('http://127.0.0.1');

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: isLocalBackend,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kosmo.vietprodev.com",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/api/storage/uploads/**",
      },
      {
        protocol: 'https',
        hostname: 's3-hcm5-r1.longvan.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
