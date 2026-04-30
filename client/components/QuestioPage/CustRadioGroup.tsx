'use client'
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { setField } from "@/state/slices/UserInputSlice";
import ButtonPushRoute from "@/components/QuestioPage/ButtonPushRoute";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { useDispatch } from "react-redux"


interface FieldInput {
  title : string;
  description? : string;
  value: string;

  
}
interface CustRadioGroupProp {
  fields: [FieldInput, FieldInput, FieldInput];
  route: string;
  fieldkey : string
  className? : string;
}




export default function CustRadioGroup( props: CustRadioGroupProp) {


  const dispatch = useDispatch();

const [value, setValue] = useState<string>(props.fields[1].value)
  


  return (

    <>
        <RadioGroup defaultValue={props.fields[1].value} className={cn("max-w-sm gap-4",props.className)} onValueChange={ (data) => setValue(data)} >
      {props.fields.map((field) => (
        <FieldLabel key={field.value} htmlFor={field.value} className="cursor-pointer">
          <Field orientation="horizontal" className="flex items-center justify-between p-4 border rounded-lg">
            <FieldContent>
              <FieldTitle>{field.title}</FieldTitle>
              <FieldDescription>{field.description}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={field.value} id={field.value} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
    
       <ButtonPushRoute classname="mt-5" text='Keep going →' route={props.route} action={ () => dispatch(setField( {key: props.fieldkey , value : value}))} /> 
    </>
  
  );
}
       

