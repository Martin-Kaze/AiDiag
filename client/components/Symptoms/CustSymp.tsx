import { useDispatch } from "react-redux";
import { add } from "@/state/slices/slice";
import { useState } from "react";

export default function CustSymp () {

  const [ data, setData ] = useState<string>("")
  const dispatch = useDispatch();
  
    return ( <div className="[grid-area:custsymp] flex flex-col self-end gap-1.5 mt-2"> 

    <label 
      htmlFor="custsymp" 
      className="text-sm font-medium text-slate-700 ml-1"> 
      Custom Symptom
    </label>
    <input
          onChange={ (data) => {
          setData(data.target.value)
          } }
          onKeyDown={ (e) => {if (e.key == "Enter"){
            dispatch(add(data));
            setData("")
          }}}
      value = {data}
      id="custsymp" 
      type="text" 
      name="custsympt"
      placeholder="Type how you feel here..."
      className="border border-slate-200 rounded-xl h-22 w-110 px-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
    />
  </div>
  )
}