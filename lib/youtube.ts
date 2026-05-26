// @/lib/youtube.ts
import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const youtube = cache(async () => {
  let session = null;
  let tokens = null;
  
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) redirect("/login");
  
    tokens = await auth.api.getAccessToken({
      headers: await headers(),
      body: { providerId: "google" },
    });
  
    if (!tokens?.accessToken) redirect("/login");
  
  } catch (err) {
    console.error("AUTH ERROR:", err);
    redirect("/login");
  }

  let subscriptions: any[] = [];
  
  if (tokens?.accessToken) {
    let nextPageToken = "";
    do {
      let url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50`;
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      const data = await response.json();
      if (data.items) {
        subscriptions = [...subscriptions, ...data.items];
      }
      nextPageToken = data.nextPageToken;
      
    } while (nextPageToken); 
  }

  return subscriptions;
});

export default youtube;