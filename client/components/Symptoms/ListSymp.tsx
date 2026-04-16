import { useDispatch } from "react-redux";
import { add } from "@/state/slices/slice";

export function SymptomList(props: { filteredlist: string[], alrdselected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>, setQuery : React.Dispatch<React.SetStateAction<string>>}) {

  const dispatch = useDispatch();
  const Adding = (data: string) => {
        dispatch(add(data));
  };

  return (
    <div 
    className=" w-full absolute flex flex-col top-full bg-white items-center  rounded-xl"
    >
    {props.filteredlist.map((data) => 
    <a 
    className=" rounded-xl px-2 text-neutral bg-white hover:bg-accent cursor-pointer m-3 hover:text-accent-content  "
     onClick={() => {Adding(data); props.setQuery("")} } key={data}> {data}
    </a>
    )}

    </div>
  )
}