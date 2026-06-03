
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

    if (!session) {
      redirect("/login?error=reauth");
    }

    tokens = await auth.api.getAccessToken({
      headers: await headers(),
      body: { providerId: "google" },
    });

  } catch (err) {
    console.error("AUTH ERROR:", err);
    redirect("/login?error=reauth");
  }
  if (!tokens?.accessToken) {
    redirect("/login?error=reauth");
  }
  const subscriptions: any[] = [];
  let nextPageToken = "";

  do {
    let url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50`;
    if (nextPageToken) url += `&pageToken=${nextPageToken}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
      cache: "no-store",
    });

    const data = await response.json();

    if (data.error) {
      if (data.error?.code === 401 || data.error?.status === 401 || data.error?.code === 403 || data.error?.status === 403) {
      return null; 
    }
      console.error("YOUTUBE API ERROR:", data.error);
      break;
    }

    if (data.items) subscriptions.push(...data.items);
    nextPageToken = data.nextPageToken;

  } while (nextPageToken);

  return subscriptions;
});

export default youtube;