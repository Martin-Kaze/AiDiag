import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./db";

export const auth = betterAuth({
  database: mongodbAdapter(client.db(), { client }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://wellness.chat",
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: [
        "openid",
        "email",
        "profile",
      ],
      prompt: "consent", 
      accessType: "offline"
    },
  },
});