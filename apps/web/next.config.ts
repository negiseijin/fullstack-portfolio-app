import type { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@repo/api', '@repo/auth', '@repo/ui'],
} satisfies NextConfig;

export default nextConfig;
