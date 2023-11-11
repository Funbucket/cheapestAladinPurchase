/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: "/m/:path*",
        destination: "http://www.aladin.co.kr/ttb/api/:path*",
      },
      {
        source: "/:path*",
        destination: "http://www.aladin.co.kr/ttb/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
