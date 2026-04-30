import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   allowedDevOrigins: ["192.168.0.100"],
   
   async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://127.0.0.1:3500/api/:path*'
          : 'https://your-api-domain.com/api/:path*', 
      },
    ];
  },
};

export default nextConfig;
