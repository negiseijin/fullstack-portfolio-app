import type { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@repo/api', '@repo/auth', '@repo/database', '@repo/ui'],
  serverComponentsExternalPackages: ['sharp', '@prisma/client'],
} satisfies NextConfig;

export default nextConfig;
