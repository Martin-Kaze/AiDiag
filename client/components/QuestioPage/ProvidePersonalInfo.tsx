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
    <div className="flex flex-col items-center max-w-sm mx-auto w-full gap-6">

      <p className="text-sm text-muted-foreground text-center">
        Used to calibrate your health baselines. Takes 10 seconds.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); router.push('/questions/nextstep'); }}
        className="flex flex-col gap-5 w-full"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Biological sex</label>
          <Select onValueChange={(val) => { dispatch(SetGender(val)); setGender(val); }}>
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

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Age</label>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              inputMode="numeric"
              min={18}
              max={120}
              placeholder="e.g. 34"
              className="w-28"
              onBlur={(e) => { dispatch(SetAge(+e.target.value)); setAge(+e.target.value); }}
              onKeyDown={(e) => { if (e.key === 'Enter') dispatch(SetAge(+e.currentTarget.value)); }}
            />
            <span className="text-sm text-muted-foreground">years old</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <LockIcon className="w-3 h-3" /> Never stored or shared.
        </p>

        <Button disabled={!gender || age < 18} type="submit" className="mt-4 w-full">Continue</Button>
      </form>
    </div>
  )
}

export default ProvidePersonalInfo