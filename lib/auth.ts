import { betterAuth } from "better-auth";

export const auth = betterAuth({
  account: { storeAccountCookie: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
      // 1. THIS IS THE FIX: The scope array goes here, at the top level
      scope: [
        "profile", 
        "email", 
        "openid", 
        "https://www.googleapis.com/auth/yt-analytics.readonly", 
        "https://www.googleapis.com/auth/youtube.readonly"
      ],

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    },
  },
});