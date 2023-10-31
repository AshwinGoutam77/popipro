/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ["https://admin.popipro.com/"],
    minimumCacheTTL: 60,
    disableStaticImages: true,
  },
};

module.exports = nextConfig;
