/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/sign-up",
        destination: "/sign-up/page",
      },
    ];
  },
};

module.exports = nextConfig;
