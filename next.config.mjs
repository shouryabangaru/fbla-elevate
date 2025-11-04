/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      enabled: true,
    },
  },
  turbopack: {},
  webpack: (config) => {
    config.externals.push({
      'ws': 'commonjs ws',
      'bufferutil': 'commonjs bufferutil',
      'utf-8-validate': 'commonjs utf-8-validate',
    });
    return config;
  },
};

export default nextConfig;
