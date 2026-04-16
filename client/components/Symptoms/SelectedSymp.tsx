import { useDispatch, useSelector } from "react-redux";
import { remove } from "@/state/slices/slice";
import type { RootState } from "../../../../AiDiag/client/src/state/store"

export function SelectedSymptopms(props: { selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>> }) {
  
  const selected = useSelector((state: RootState) => state.SymptomsReduce.selected);
  const dispatch = useDispatch();
  const removing = (data: string) => dispatch(remove(data));

  const showSelected = (block: string) => 
  <div 
  className="flex max-w-xs items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-medium border border-amber-200 animate-in fade-in zoom-in duration-200" 
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
  
  return (<div className="flex flex-col">
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3"> Selected sympotms ({props.selected.length}):  </p>
    <div className="flex flex-wrap gap-2 min-h-10 min-w-50 w-fit p-3 rounded-xl bg-white border border-slate-200 shadow-sm max-h-32 overflow-y-auto transition-all">
      {selected.length === 0 ? (
        <p className="text-sm text-slate-400 italic">Nothing selected</p>
      ) : (
        selected.map(showSelected)
      )}
    </div>
  </div>)

}