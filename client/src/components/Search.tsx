import React, { useState, useMemo, useCallback } from "react";
import { Symptoms } from '../data/Symptoms';

// 1. Create a memoized button to prevent unnecessary re-paints
const SymptomItem = React.memo(({ name, onClick }: { name: string, onClick: (s: string) => void }) => {
  return (
    <button onClick={() => onClick(name)} type='button' className="block p-2 hover:bg-gray-100 w-full text-left">
      {name}
    </button>
  );
});

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (query.trim() === "") return [];
    return Symptoms
      .filter(item => item.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query]); // Removed 'selected' from here

  const selecting = useCallback((data: string) => {
    setSelected((prev) => (prev.includes(data) ? prev : [...prev, data]));
  }, []);

  const removeItem = (itemToRemove :string) => {
  setSelected((prev) => prev.filter((item) => item !== itemToRemove));
};

  return (
    <div className="p-4 max-w-md">
      <input 
        className="w-full p-3 border-2 border-gray-200 rounded-lg" 
        placeholder="Type Symptoms here..."
        type="search" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* List 1: Already Selected */}
      <div className="mt-4">
        <p className="text-sm font-bold">Selected:</p>
        {selected.map((item, index) => (
          <div key={index} className="bg-amber-600 ">
            <span key={index + 1}  className="inline-block bg-blue-100 m-1 p-1 rounded">{item}</span>
            <button onClick={() => removeItem(item)}type="button" key={index}> x </button>
          </div>
           
        ))}
      </div>

      {/* List 2: Filtered Results */}
      <div className="mt-2 border rounded shadow-sm">
        {filtered.map((data) => (
          <SymptomItem key={data} name={data} onClick={selecting} />
        ))}
      </div>
    </div>
  );
}