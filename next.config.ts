import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "fovahng09da895xk.public.blob.vercel-storage.com"
      }
    ]
  }
};

export default nextConfig;
