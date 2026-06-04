
export function simplifyChannels(data: any[]) {
  return data.map((item) => ({
    name: item.snippet?.title ?? "",
    channelId: item.snippet?.resourceId?.channelId ?? "",
  }));
}
