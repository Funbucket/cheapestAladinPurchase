/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: "/m/:path*__index",
        destination: "/:path*",
      },
      {
        source: "/:path*__index",
        destination: "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
