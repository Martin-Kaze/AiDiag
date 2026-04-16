import { useDispatch } from "react-redux";
import { add } from "@/state/slices/slice";
import { useState } from "react";

export default function CustSymp () {

  const [ data, setData ] = useState<string>("")
  const dispatch = useDispatch();
  
    return ( <div className="flex flex-col justify-center items-center  "> 

    <label 
      htmlFor="custsymp" 
      className="block text-2xl font-medium mb-3"> 
      Custom Symptom:
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
      placeholder="Write here..."
      className="input input-lg "
    />
  </div>
  )
}