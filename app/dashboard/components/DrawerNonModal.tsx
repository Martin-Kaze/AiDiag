import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { LoginForm } from "@/app/dashboard/components/login-form"

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

export function DrawerNonModal(props: { name: string; login: boolean; data: SubscriberData }) {
  console.log(props.data)
  return (
    <Drawer modal={false} disablePointerDismissal swipeDirection="right">
      <DrawerTrigger render={<Button className="ml-0" variant="outline">{props.name}</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="self-center "> {(props.login) ? "Welcome" : null}  </DrawerTitle>
        </DrawerHeader>
        {(props.login) ?  <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12 self-center m-5">
          <a> Sublist:</a>
          <AvatarGroup>

            <Avatar>
              <AvatarImage
                src={props.data?.subscriptions[0]?.snippet?.thumbnails?.default?.url}
                alt="@shadcn"
                
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src={props.data?.subscriptions[1]?.snippet?.thumbnails?.default?.url}
                alt="@shadcn"
                
              />
              <AvatarFallback>{props.data?.subscriptions[1]?.snippet?.title || "NaN"}</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src={props.data?.subscriptions[2]?.snippet?.thumbnails?.default?.url}
                alt="@shadcn"
             
              />
              <AvatarFallback>{props.data?.subscriptions[2]?.snippet?.title || "NaN"}</AvatarFallback>
            </Avatar>
            {typeof props.data?.total === 'number' && props.data.total > 3
              ? <AvatarGroupCount> +{props.data.total - 3} </AvatarGroupCount>
              : null}
          </AvatarGroup>
        </div>: <LoginForm/> }
       



        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
