import { betterAuth } from "better-auth";

export const auth = betterAuth({

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
     scope: [
  "openid",
  "email",
  "https://www.googleapis.com/auth/youtube.readonly",
],

    },
  },
});