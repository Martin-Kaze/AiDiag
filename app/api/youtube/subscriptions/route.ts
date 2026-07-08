import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export async function GET() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accessToken } = await auth.api.getAccessToken({
        body: { providerId: "google" },
        headers: await headers(),
    });

    let allSubs: any[] = [];
    let pageToken: string | undefined = undefined;

    do {
        const url = new URL("https://www.googleapis.com/youtube/v3/subscriptions");
        url.searchParams.set("part", "snippet");
        url.searchParams.set("mine", "true");
        url.searchParams.set("maxResults", "50");
        if (pageToken) url.searchParams.set("pageToken", pageToken);

        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log("YouTube API status:", res.status);
        
        if (!res.ok) {
            const errBody = await res.text();
            console.error("YouTube API error:", res.status, errBody);
            return Response.json(
                { error: "Failed to fetch YouTube data", status: res.status },
                { status: 502 }
            );
        }

        const data = await res.json();
        allSubs = allSubs.concat(data.items ?? []);
        pageToken = data.nextPageToken;
    } while (pageToken);

    return Response.json({ subscriptions: allSubs, total: allSubs.length });
}