import React from 'react'
import { FieldSet, FieldLegend, FieldDescription, FieldGroup } from '../ui/field'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import type { InfoData } from "@/types/types";

type ToggleGroupProps = { LengedText: string; DescripText: string; classname? : string; data : InfoData[] }
const CustToggleGroup = (props : ToggleGroupProps ) => {
  return (
    <FieldSet className='flex flex-col items-center justify-center w-100%'>
        <FieldLegend variant="label">
          {props.LengedText}
        </FieldLegend>
        <FieldDescription>
          {props.DescripText}
        </FieldDescription>
        
        <FieldGroup className="gap-3 flex  text-center   items-center">
          <ToggleGroup type="multiple" className="flex gap-4  ">

            { props.data.map( (data, index) => {
                return (
                    <ToggleGroupItem 
            key={index}
              value={data.Title}
              className="flex flex-col  items-center p-6 h-auto w-40 border-2 bg-neutral-100 data-[state=on]:border-violet-500 data-[state=on]:bg-violet-50"
            >
             <span className="font-bold">{data.Title}</span>
              <span className="text-xs text-muted-foreground">{data.MoreInfo}</span>  
              </ToggleGroupItem>  
                )
             
            })}

          </ToggleGroup>
        </FieldGroup>
      </FieldSet>
  )
}

export default CustToggleGroup