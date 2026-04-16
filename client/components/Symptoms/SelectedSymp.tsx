import { useDispatch, useSelector } from "react-redux";
import { remove } from "@/state/slices/slice";
import type { RootState } from "../../../../AiDiag/client/src/state/store"

export function SelectedSymptopms(props: { selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>> }) {
  
  const selected = useSelector((state: RootState) => state.SymptomsReduce.selected);
  const dispatch = useDispatch();
  const removing = (data: string) => dispatch(remove(data));

  const showSelected = (block: string) => 
  <div 
  className="flex max-w-[90%] items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-medium border border-amber-200 animate-in fade-in zoom-in duration-200" 
  key={block}> 
  <p 
  className="truncate" 
  > 
  {block} 
  </p> 
   <button onClick={() => removing(block)}
    className="bg-transparent text-amber-600 text-lg leading-none">
    x 
    </button>
  </div>;
  
  return (<div className="pt-5 flex flex-col  place-self-center min-w-xs max-w-xs">
    
    <div className=" border-neutral rounded-xl flex flex-wrap gap-2 ">
     
        {selected.map(showSelected)}
      
    </div>
  </div>)

}