'use client'
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

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldGroup
} from "@/components/ui/field"

import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { LoginForm } from "@/app/dashboard/components/login-form"
import { Separator } from "@/components/ui/separator"

import { useEffect , useState} from "react"
import { cn } from "@/lib/utils"

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

  const [criteria , setCriteria] = useState<string>("");
  const [goals , setGoals] = useState<string>("");
  const [cirtNumb , setCirtNumb] = useState<number>(0);
  

  useEffect(() => {
    const criteria = localStorage.getItem('criteria');
    const goals = localStorage.getItem('goals');
    if(criteria){
    setCriteria(criteria);
    }
    if(goals){
    setGoals(goals);
    }
  }, []);

   useEffect(() => {
    localStorage.setItem('criteria', criteria);
    localStorage.setItem('goals', goals);
  }, [criteria, goals]);
  
 
  return (
    <Drawer modal={false} disablePointerDismissal swipeDirection="right">
      <DrawerTrigger render={<Button className="ml-0" variant="outline">{props.name}</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="self-center "> {(props.login) ? "Welcome" : null}  </DrawerTitle>
        </DrawerHeader>

        {(!props.login) ?  <LoginForm/> : <div className="flex flex-col gap-6 m-5">
          <div className="flex gap-2 items-center">
<p> Sublist:</p>
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
          </div>
          

          <Separator/>
          <p className="font font-quicksand self-center"> Preferecnes </p>

            <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="block-end-input">Your Wellness Goals</FieldLabel>
        <InputGroup className="h-auto">
          <InputGroupInput id="block-end-input" placeholder="Write shortly..."
           value={goals}
          onChange={(e) => { const value = e.target.value; if (e.target.value.length > 280) return; setGoals(e.target.value)}}/>
          <InputGroupAddon align="block-end">
            
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>What are your goals for this app?</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="block-end-textarea">Your Criteria for Channels</FieldLabel>
        <InputGroup   className={cn( (criteria.length > 280)? "bg-red-100" : "")}>
          <InputGroupTextarea
            id="block-end-textarea"
            placeholder="e.g. Religion, Politics, Religion"
            value={criteria}
            onChange={(e) => { const value = e.target.value; if (e.target.value.length> 280) return; setCriteria(e.target.value); setCirtNumb(value.length)}}
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>{cirtNumb}/280</InputGroupText>
          
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
         Describe the kinds of channels you want to see or avoid.
        </FieldDescription>
      </Field>
    </FieldGroup>

        </div> 
        
        }


       



        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
