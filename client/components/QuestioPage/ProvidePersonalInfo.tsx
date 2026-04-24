'use client'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { SetGender, SetAge } from '@/state/slices/UserInputSlice';
import { AppDispatch } from '@/state/store';
import React from 'react';
import { useMyLogic } from '@/lib/useMyLogic';
import { LockIcon } from 'lucide-react';
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function ProvidePersonalInfo() {
  const dispatch: AppDispatch = useDispatch();
  const { router } = useMyLogic();

  const [gender, setGender] = useState('');
const [age, setAge] = useState(0);

  return (
    <div className="flex flex-col  max-w-sm mx-auto w-full gap-6 ">

      <p className="text-sm text-muted-foreground text-center">
        Used to calibrate your health baselines. Takes 10 seconds.
      </p>

      <form
  onSubmit={(e) => { e.preventDefault(); router.push('/questions/nextstep'); }}
  className="flex flex-col gap-5 w-full items-center"
>
  <div className="flex items-end gap-3">
    
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Biological sex</label>
      <Select onValueChange={(val) => { dispatch(SetGender(val)); setGender(val); }}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Select" />
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

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Age</label>
      <Input
  type="number"
  inputMode="numeric"
  min={18}
  max={120}
  placeholder="34"
  className="w-20"
  onChange={(e) => { 
    const val = +e.target.value;
    dispatch(SetAge(val)); 
    setAge(val); 
  }}
/>
    </div>

  </div>

  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
    <LockIcon className="w-3 h-3" /> Never stored or shared.
  </p>

  <Button disabled={!gender || age < 18} type="submit" className="w-full">Continue</Button>
</form>
    </div>
  )
}

export default ProvidePersonalInfo