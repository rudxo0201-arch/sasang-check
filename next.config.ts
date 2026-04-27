import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/onboarding',
        destination: '/check/sasang/onboarding',
        permanent: true,
      },
      {
        source: '/test',
        destination: '/check/sasang/run',
        permanent: true,
      },
      {
        source: '/result/:type',
        destination: '/check/sasang/result/:type',
        permanent: true,
      },
      {
        source: '/ad/:type',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
