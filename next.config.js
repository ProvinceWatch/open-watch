/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HERE_API_KEY: process.env.HERE_API_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
