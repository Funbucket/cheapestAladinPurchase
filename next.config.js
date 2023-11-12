/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/m/aladin/:path*",
        destination: "http://www.aladin.co.kr/ttb/api/:path*",
      },
      {
        source: "/aladin/:path*",
        destination: "http://www.aladin.co.kr/ttb/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
