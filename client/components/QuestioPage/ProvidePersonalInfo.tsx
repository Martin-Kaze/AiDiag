'use client'
import { useDispatch } from 'react-redux';
import { SetGender , SetAge } from '@/state/slices/UserInputSlice';
import { AppDispatch } from '@/state/store';
import React, { useEffect , useState} from 'react';
import { useMyLogic } from '@/lib/useMyLogic';
import { LockIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { log } from 'console';

function ProvidePersonalInfo() {

  
    
    const dispatch : AppDispatch = useDispatch();
    const { router } = useMyLogic();

     const handleValueChange = (val: string) => {
  console.log("Selected Value:", val); 
  dispatch(SetGender(val)); 


  console.log(router);
  

};

  return (
<div className='flex flex-col items-center'>
  <p className="text-sm text-muted-foreground mb-4">
    Biological sex and age influence many health markers — including hormone
    ranges, cardiovascular baselines, and metabolic rates. This helps our AI
    interpret your data accurately.
  </p>

  <div className="flex flex-col gap-5">
    {/* Biological Sex */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        Biological sex
      </label>
      <Select onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select one" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="undisclosed">Prefer not to say</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    {/* Age */}
    <div className="flex flex-col gap-2 ">
      <label className="text-sm font-medium text-foreground">
        Age
      </label>
      <div className="flex items-center gap-3">
        <Input
          type="number"
          min={18}
          max={120}
          placeholder="e.g. 34"
          className="w-28"
           onBlur={ (e) => dispatch(SetAge(+ e.target.value))}
        />
        <span className="text-sm text-muted-foreground">years old</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Age affects reference ranges for cholesterol, blood pressure, and more.
      </p>
    </div>

    {/* Privacy note */}
    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
      <LockIcon className="w-3 h-3" />
      Used only for analysis. Never stored or shared.
    </p>
  </div>
  <Button className='mt-10'> Summit </Button>
</div>

    
    
  )
}

export default ProvidePersonalInfo