"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import { setYoutubeList } from "@/state/slices/UserInputSlice";
import { useEffect } from "react";

type YoutubeSubscription = {
  snippet?: {
    title?: string;
    thumbnails?: {
      default?: {
        url?: string;
      };
    };
    resourceId?: {
      channelId?: string;
    };
  };
};

export function simplifyChannels(data: YoutubeSubscription[]) {
  return data.map((item) => ({
    name: item.snippet?.title ?? "",
    channelId: item.snippet?.resourceId?.channelId ?? "",
  }));
}

type AvatarClientProps = {
  data: YoutubeSubscription[];
};

const AvatarClient = ({ data }: AvatarClientProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    const simpleChannels = simplifyChannels(data);
    dispatch(setYoutubeList(simpleChannels));
  }, [data, dispatch]);

  return (
    <AvatarGroup>
      {data?.slice(0, 3).map((item) => (
        <Avatar size="lg" key={item.snippet?.resourceId?.channelId}>
          <AvatarImage
            src={item.snippet?.thumbnails?.default?.url ?? ""}
            alt={item.snippet?.title ?? "Avatar"}
          />

          <AvatarFallback>
            {item.snippet?.title?.[0] ?? "?"}
          </AvatarFallback>
        </Avatar>
      ))}

      {data?.length > 3 && (
        <AvatarGroupCount>{`+${data.length - 3}`}</AvatarGroupCount>
      )}
    </AvatarGroup>
  );
};

export default AvatarClient;