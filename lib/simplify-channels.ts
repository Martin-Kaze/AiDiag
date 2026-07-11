
interface Channel {
  kind: string,
  etag: string,
  id: string,
  snippet: {
    publishedAt: string,
    title: string,
    description: string,
    resourceId: {
      kind: string,
      channelId: string,
    },
    channelId: string,
    thumbnails: {
      default: {
        url: string,
      },
      medium: {
        url: string,
      },
      high: {
        url: string,
      }
    }
  }
}

interface SubscriberData {
  subscriptions: Channel[];
  total: string;
}

export function Simplify_Channel(data: SubscriberData) {


    if (!data.subscriptions) {

        return {
            total: data.total,
            subscriptions: [],
        };
    }

    return {
        total: data.total,
        subscriptions: data.subscriptions.map(({ snippet }) => [
            snippet.resourceId.channelId,
            snippet.title,
            snippet.description,
        ]),
    };
}