'use client'
import { useState } from "react";
import { Badge as Bg } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Field, FieldLabel, FieldLegend, FieldSet, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import CustToggleGroup from "../MutipleUse/CustToggleGroup";
import type { InfoData } from "@/types/types";
// Moved outside the main component for better performance
const SelectMutipleIcon = (props: { val: number }) => {
  return (
    <div className="shrink-0 w-8 h-8 my-5 rounded-full bg-green-300 text-black flex items-center justify-center text-sm font-semibold">
      {props.val}
    </div>
  )
}

const FirstTitleAndDescript ={
   Title : 'What is your goal in this faggotry expense',
   Descript : 'eDescription is very important but still should be long'
}

const SecondTitleAndDescript ={
   Title : 'Not a What is your goal in this faggotry expense',
   Descript : 'vertu short heeh'
}

const ValuesForFirstQuestion : InfoData[] = [
  {Title: 'hey', MoreInfo: 'bye'},
  {Title: 'Say', MoreInfo: 'Lay'},
  {Title: 'Saye', MoreInfo: 'Laye'},
]

const ValuesForSecondQuestion : InfoData[] = [
  {Title: 'hey2', MoreInfo: 'bye2'},
  {Title: 'Say2', MoreInfo: 'Lay2'},
  {Title: 'Saye3', MoreInfo: 'Laye3'},
]

const ExplainMore = () => {
  const [thecorrect, setCorrect] = useState<boolean | undefined>(undefined);
  const [thefalse, setTheFalse] = useState<boolean | undefined>(undefined);
  
  const value = useSelector((val: RootState) => val.UserInputReducer.selections);
  const symparr = Object.keys(value);

  const HandleFalseClick = () => {
    setTheFalse(true);
    setCorrect(false);
  };
  
  const HandleTrueClick = () => {
    setCorrect(true);
    setTheFalse(false);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <Alert className="max-w-md">
        <Bg />
        <AlertTitle className="border-b pb-1">{symparr[0]}</AlertTitle>
        <AlertDescription className="text-black mt-2">
          Minimum description is enough here. I don't know how long I can have it, but we will see. (Max 240)
        </AlertDescription>
      </Alert>

      {thecorrect != true && (<>
        <div className='flex flex-row gap-3 mt-5 justify-center'>
          <FieldSet className="w-full max-w-xs">
            <FieldLegend variant="label" className="text-center">Confirm if the AI symptom analysis is accurate.</FieldLegend>
            <RadioGroup className='flex'>
              <Field orientation="horizontal" className='border-2 p-2 rounded-2xl border-green-500 bg-green-200'>
                <RadioGroupItem value="true" id="true-select" onClick={HandleTrueClick} checked={thecorrect} />
                <FieldLabel htmlFor="true-select" className="font-normal">
                  True
                </FieldLabel>
              </Field>
              <Field orientation="horizontal" className='border-2 p-2 rounded-2xl border-red-500 bg-red-200'>
                <RadioGroupItem value="false" id="false-select" onClick={HandleFalseClick} checked={thefalse} />
                <FieldLabel htmlFor="false-select" className="font-normal">
                  False
                </FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>
          
        </div>
        <p className="mt-5 text-sm font-light text-neutral-400"> Note this is nto adoctor , jsut ansaling tool that takes , legal stuff aso on and so on.</p>
        </>
       
      )}
      
      <Separator orientation='horizontal' className="my-4" />
{thecorrect === true && (
<div className="flex flex-col  items-center text-center">


      <SelectMutipleIcon val={1} />
      
      <CustToggleGroup data={ValuesForFirstQuestion} DescripText={FirstTitleAndDescript.Descript} LengedText={FirstTitleAndDescript.Title}/>

      <SelectMutipleIcon val={2} />
      
      <CustToggleGroup data={ValuesForSecondQuestion} DescripText={SecondTitleAndDescript.Descript} LengedText={SecondTitleAndDescript.Title}/>
</div>
)}
    </div>
  );
};

export default ExplainMore;
