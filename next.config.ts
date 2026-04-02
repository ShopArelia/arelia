import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    remotePatterns: [
      new URL('https://placehold.co/300x300'),
    ],
  },
}
export default nextConfig;
