'use client'
import { Badge as Bg, CirclePlus, Eraser } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useState } from 'react';

import { setField } from '@/state/slices/UserInputSlice';
import { useDispatch } from 'react-redux';

export function UserInput() {

  const dispatch = useDispatch();

  const [Text, SetText] = useState<string>("");

  const [symptomNumb, setSymptomNumb] = useState<number>(1);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    SetText(value);
  };
  const handleClick = () => {
    SetText("");
  }

  const HandleAdd = ()=> {
    if(Text){
      console.log('test');
      dispatch(setField( { key: `Symptom-${symptomNumb}` , value: Text  } ))
      setSymptomNumb((prev) => prev + 1);
      SetText("");
    } 

  }

  return (
    <div className="grid w-full max-w-md gap-4 self-center bg-white">
      <InputGroup >
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="I feel everyday..."
          className="min-h-50 "
          onChange={handleInput}
          maxLength={100}
          value={Text}
        />
        <InputGroupAddon align="block-end" className="border-t  ">
          <InputGroupText>Max 250 characters</InputGroupText>
          <InputGroupButton size="sm" className="ml-auto" variant="default" disabled={(Text) ? false : true} onClick={HandleAdd}>
            Add <CirclePlus />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b ">
          <InputGroupText className="font-mono font-medium  ">
            <Bg />
            <p className=' text-black'> {`Symptom-${symptomNumb}`} </p>
          </InputGroupText>
          <InputGroupButton className="ml-auto " size="icon-xs" onClick={handleClick}>
            <Eraser />
          </InputGroupButton>

        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
