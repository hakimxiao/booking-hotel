import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // kita akan membuat api kita menjadi public
  async function() {
    return [
      {
        sources: "/api/payment/notification/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*"},
          { key: "Access-Control-Allow-Methods", value: "GET, POST"},
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"},
        ]
      }
    ]
  },

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
