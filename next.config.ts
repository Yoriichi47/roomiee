import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: "http",
      hostname: "**.com",  // ** means that any thing canbe here
      port: "",
      pathname: "/**"
    }
    // "images.unsplash.com","plus.unsplash.com", "res.cloudinary.com"
  ],
  },
};

export default nextConfig;
