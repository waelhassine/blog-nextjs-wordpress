/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sea-electronics.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
