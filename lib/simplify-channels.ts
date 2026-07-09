
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

export  function Simplify_Channel(param: SubscriberData) {
    return {
        ...param,
        subscriptions: param.subscriptions.map( (channel : Channel) => ({
        channelid : channel.snippet.channelId,
        title : channel.snippet.title,
        description : channel.snippet.description,
        }))
        
    }
}