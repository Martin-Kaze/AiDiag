import { NextResponse, type NextRequest } from "next/server";
import { XMLParser } from "fast-xml-parser";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`);

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch feed" }, { status: res.status });
  }

  const xml = await res.text();
  const parser = new XMLParser({ isArray: (name) => name === "entry" });
  const parsed = parser.parse(xml);

  const feed = parsed.feed;
  const entries = feed.entry || [];

  const videos = entries.map((entry: any) => ({
    title: entry.title,
  }));

  return NextResponse.json({
    channel: feed.title,
    videos,
  });
}