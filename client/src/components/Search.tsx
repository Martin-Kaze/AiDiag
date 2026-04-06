import { useState, useMemo } from "react";
import { Symptoms } from '../data/Symptoms'; // This is correct now!

export default function Search() {


  const [query, setQuery] = useState("");
   const filtered = useMemo(() => {
  if (query.trim() === "") return [];
  return Symptoms
    .filter(item => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
}, [query]);

  return (
    <div>
      <label htmlFor="search"  > Search
        <input className="border" type="search" id="site-search" name="q" value={query} onChange={ (e) => setQuery(e.target.value)}/>
        <div>
         {filtered.map((data, index) => { return ( <button type='button' key={index} className="block p-2 hover:bg-gray-100 cursor-pointer"> {data} </button>) })}
        </div>
      
      </label>
    </div>
  );
}