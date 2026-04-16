import { useDispatch } from "react-redux";
import { add } from "../../../../AiDiag/client/src/state/slices/slice"

export function SymptomList(props: { filteredlist: string[], alrdselected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>, setQuery : React.Dispatch<React.SetStateAction<string>>}) {

  const dispatch = useDispatch();
  const Adding = (data: string) => {
        dispatch(add(data));
  };

  return (
    <div 
    className="absolute flex flex-col items-center bg-white z-47 w-full mt-2 pb-1 rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200"
    >

    {props.filteredlist.map((data) => 
    <a 
    className="block w-full text- px-5 py-3 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-colors border-b border-slate-50 last:border-none cursor-pointer"
     onClick={() => {Adding(data); props.setQuery("")} } key={data}> {data}
    </a>
    )}

    </div>
  )
}