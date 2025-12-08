/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix for react-pdf with Next.js
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
}

module.exports = nextConfig
