'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux";
import { RootState } from "@/state/store"; 

export function useMyLogic() {
  const router = useRouter();
  const userdata = useSelector( (data : RootState) => data.UserInputReducer )

  useEffect(() => {

    if( userdata.ExplainingSelected == false){
      router.push('/')
    }
    
  }, [userdata]);
  return { router }; 
}