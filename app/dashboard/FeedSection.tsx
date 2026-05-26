import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"
import GiveChannelInfo from "@/lib/ChannelInfo";


export default async function FeedSection({
  subscriptions,
}: {
  subscriptions: any[];
}) {
    

const links = subscriptions
  .map((sub) => sub.snippet?.resourceId?.channelId)
  .filter(Boolean);





  const channelInfos: any[] = [];

  for (const link of links) {
    

    try {
      const data = await GiveChannelInfo(
        "https://www.youtube.com/feeds/videos.xml?channel_id=" + link
      );

      channelInfos.push(data);
    } catch (err) {
      console.warn("Failed channel:", link);
      channelInfos.push(null);
    }

    // small delay to avoid 429
    await new Promise((r) => setTimeout(r, 80));
  }


  return (
    <div>
      
      <h2 className="text-xl font-bold">Channel Feeds</h2>

      <ScrollArea className="h-50 w-full rounded-md border ">

        <Table>
      <TableCaption>A list of your recent channels.</TableCaption>
      <TableHeader className="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead>Channel</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Videos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {channelInfos.map((item, index) => (
          <TableRow key={item.feed?.id ?? index}>
            <TableCell className="font-medium">
              {item.feed?.title ?? "Unknown"}
            </TableCell>
            <TableCell>{item.feed?.published ?? "Unknown"}</TableCell>
            <TableCell>{item.feed?.entry?.length ?? 0}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total channels: {channelInfos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
      
       </ScrollArea>
    </div>
  );
}