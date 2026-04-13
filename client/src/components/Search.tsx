import { useState, useMemo } from "react";
import { Symptoms } from "../data/Symptoms";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store"
import { add, remove } from "../state/slices/slice"


function SelectedSymptopms( props : { selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>> } ) {
const selected = useSelector( (state : RootState)=> state.SelectedModels.selected);
const dispatch = useDispatch();
  const removing = (data: string) => dispatch(remove(data));
  const showSelected = (block: string, index: number) => <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-medium border border-amber-200 animate-in fade-in zoom-in duration-200" key={block}> <p  > {block} </p>  <button onClick={ () => removing(block)}className="bg-transparent text-amber-600 text-lg leading-none"> x </button></div>;
  return(<div className="flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3"> Selected sympotms ({props.selected.length}):  </p>
        <div className="flex flex-wrap gap-2 min-h-10 min-w-50 w-fit p-3 rounded-xl bg-white border border-slate-200 shadow-sm max-h-32 overflow-y-auto transition-all">
         {selected.length === 0 ? (
  <p className="text-sm text-slate-400 italic">Nothing selected</p>
) : (
  selected.map(showSelected)
)}
        </div>
      </div>)
  
}

function Input(props : { query: string; setQuery: (val: string) => void} ) {
  return(
     <div className="flex flex-col bg-slate-100 ">
    <label className="block text-m font-medium text-slate-600 mb-1.5 ml-1" htmlFor="type"> Search Symptoms: </label>
      <input placeholder="e.g. Headache, Fever..." className="w-100 h-12 px-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white" maxLength={50} value={props.query} id="type" type="text"
        onChange={(data) => props.setQuery(data.currentTarget.value)} />
  </div>
  )
 
  
}

function SymptomList( props : { filteredlist : string[], alrdselected : string[], setSelected: React.Dispatch<React.SetStateAction<string[]>> }){
  const dispatch = useDispatch();
  const Adding = (data: string) => {
  dispatch(add(data));
};
  return(
    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
      {props.filteredlist.map( (data, index) =>  <a className="block w-full text-left px-5 py-3 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-colors border-b border-slate-50 last:border-none cursor-pointer"onClick={ () => Adding(data)} key={data}> { data }</a>)}
    </div>
  )
}
export default function Search() {

  const [query, SetQuery] = useState<string>("");
  const [selected, SetSelected] = useState<string[]>([]);
 
  const queryWords = query.toLowerCase().split(" ").filter(word => word !== "");
  const filteredList = Object.values(Symptoms).filter(symptom => {
    const s = symptom.toLowerCase();
    return queryWords.some(word => s.includes(word));
  }).slice(0, 5);


  return (
    <div className="bg-slate-50 min-h-screen p-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl flex flex-col gap-8">
      <SelectedSymptopms selected={selected} setSelected={SetSelected} />
      <div className="relative">
      <Input query={query} setQuery={SetQuery}/>
      <SymptomList filteredlist={filteredList} alrdselected={selected} setSelected={SetSelected}/>
      </div>
      
    
    </div>
    </div>
    
  )
}