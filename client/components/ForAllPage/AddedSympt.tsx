'use client'
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Badge as Bg } from 'lucide-react';

import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

const AddedSympt = () => {
  const value = useSelector((val: RootState) => val.UserInputReducer.selections);
  const symparr = Object.keys(value);
  console.log(symparr);

  return (
    <div className="flex flex-wrap gap-2">

      {symparr.map((value, index) => (
        <Badge key={index}>
          <Bg />
          {value}
        </Badge>
      ))}

    </div>
  )
}

export default AddedSympt