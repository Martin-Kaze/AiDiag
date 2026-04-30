import { useState} from "react";
import { Symptoms } from "../../data/Symptoms";
import { useDispatch} from "react-redux";
import { on } from "@/state/slices/PopUpSlice";
import CustSymp from './CustSymp';


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


  return (
    
      <div 
      className="w-full max-w-xl flex flex-col gap-8 items-center ">
        <SelectedSymptopms selected={selected} setSelected={SetSelected} />
        <div className=" relative ">
          <Input query={query} setQuery={SetQuery} />
          <SymptomList filteredlist={filteredList} alrdselected={selected} setSelected={SetSelected} setQuery={SetQuery} />
          <CustSymp/>
<div className="flex justify-center mt-8">
<button  className="btn btn-wide btn-success "
              onClick={ () => dispatch(on())}> Next </button>
</div>
              
        </div>


      </div>
  

  )
}