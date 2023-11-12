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
        source: "/:path*_rsc",
        destination: "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
