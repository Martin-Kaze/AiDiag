import { NextResponse } from "next/server";
import youtube from "@/lib/youtube";

export async function GET() {
  const data = await youtube();
  if (!data) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ data });
}