/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HERE_API_KEY: process.env.HERE_API_KEY,
  },
}

module.exports = nextConfig
