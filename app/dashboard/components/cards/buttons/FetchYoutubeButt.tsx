'use client'

import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux";
import { setYoutubeList } from "@/state/slices/UserInputSlice";
import { simplifyChannels } from "@/lib/simplifyChannels";

const FetchYoutube = () => {
  const dispatch = useDispatch();

  const handleFetch = async () => {
    const res = await fetch("/api/youtube");    
    const json = await res.json();
    dispatch(setYoutubeList(simplifyChannels(json.data)));
  };
  
  return (
    <Button className="bg-green-400" onClick={handleFetch}>
      Get Data
    </Button>
  )
}

export default FetchYoutube