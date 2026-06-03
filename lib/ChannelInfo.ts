import { XMLParser } from "fast-xml-parser";

const GiveChannelInfo = async (url: string) => {
  const res = await fetch(url, {
    cache: "no-store",
  });

if (!res.ok) {
  console.warn("XML fetch failed:", res.status, url);
  return null;
}

  const xmlText = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,

  });

  const data = parser.parse(xmlText);

  return data;
};

export default GiveChannelInfo;