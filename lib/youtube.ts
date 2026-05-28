// @/lib/youtube.ts
import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

const youtube = cache(async () => {
  let tokens = null;
  
  
  try {
    
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      tokens = await auth.api.getAccessToken({
        headers: await headers(), 
        body: { providerId: "google" }, 
      });
    }
  } catch (err) {
    console.error("AUTH ERROR:", err);
  }


 if (!tokens?.accessToken) {
    redirect("/login?error=reauth"); // Tell the login page to wipe the session
  }

  const subscriptions: any[] = [];
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
    
    // ADD THIS to see why it's failing:
    if (data.error) {
      console.error("YOUTUBE API ERROR:", data.error);
      // Force a re-auth if the token is invalid/expired
      if (data.error.code === 401) redirect("/login?error=reauth"); 
      break; 
    }
    
    if (data.items) {
      subscriptions.push(...data.items); 
    }
    
    nextPageToken = data.nextPageToken;
    
  } while (nextPageToken); 

  return subscriptions;
});

export default youtube;