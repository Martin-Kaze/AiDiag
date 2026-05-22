'use client'
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Badge as Bg } from 'lucide-react';

import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

const AddedSympt = () => {
  const value = useSelector((val: RootState) => val.UserInputReducer.selections);
  const symparr = Object.keys(value);
  

  return (
    <>
   <div className="flex flex-wrap gap-2 justify-center">

      {symparr.map((value, index) => (
        <Badge key={index}>
          <Bg />
          {value}
        </Badge>
      ))}
            
    </div>

       {symparr.length > 0 ? <p className='mx-auto text-sm text-neutral-400'>Max 10 Symptoms</p> : null}


    </>
   
  )
}

export default AddedSympt