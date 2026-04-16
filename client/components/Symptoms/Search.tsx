"use client";
import { useState } from "react";
import { Symptoms } from "@/data/Symptoms";
import { useDispatch, useSelector } from "react-redux";
import { on } from "@/state/slices/PopUpSlice";
import CustSymp from './CustSymp';

import { RootState } from "@/state/store";
import { SelectedSymptopms } from "./SelectedSymp";
import { Input } from "./InputSymp";
import { SymptomList } from "./ListSymp";



export default function Search() {
  const dispatch = useDispatch();
  const [query, SetQuery] = useState<string>("");
  const [selected, SetSelected] = useState<string[]>([]);

  const queryWords = query.toLowerCase().split(" ").filter(word => word !== "");
  const filteredList = Object.values(Symptoms).filter(symptom => {
    const s = symptom.toLowerCase();
    return queryWords.some(word => s.includes(word));
  }).slice(0, 5);

  console.log(selected);
const selectedd = useSelector((state: RootState) => state.SymptomsReduce.selected);
  return (

    <div
      className="flex flex-col gap-8 items-center ">
      
     
        
        <div className=" flex sm:w-[90%] xl:w-[70%] p-5">
        <div className=" relative p-2 w-[50%] card bg-base-300 rounded-box grid h-auto grow place-items-center">
          <Input query={query} setQuery={SetQuery} />
        <SymptomList filteredlist={filteredList} alrdselected={selected} setSelected={SetSelected} setQuery={SetQuery} />
       </div>
       <div className="divider divider-horizontal">OR</div>
      <div className="p-2 w-[50%] card bg-base-300 rounded-box grid h-auto grow place-items-center"><CustSymp /></div>
</div>
        
        
        <SelectedSymptopms selected={selected} setSelected={SetSelected} />
        <div className="flex justify-center mt-8">

          
          
            <button className={`btn ${selectedd.length> 0 ? 'btn-primary' : 'btn-disabled' }  `}
            onClick={() => dispatch(on())}> Next </button>
        </div>
    
      
          
    </div>


  )
}