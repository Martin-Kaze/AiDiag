import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   serverExternalPackages: ["better-auth", "@better-auth/kysely-adapter", "kysely"],
  allowedDevOrigins: ["192.168.0.100"],
};

export default nextConfig;