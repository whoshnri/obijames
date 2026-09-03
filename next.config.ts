import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.app",
    "*.devtunnels.ms",
    "*.githubpreview.dev",
    "*.preview.app.github.dev",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "obijames.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
