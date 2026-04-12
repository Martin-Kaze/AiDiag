import { useState } from "react";
import { Symptoms } from "../data/Symptoms";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  const queryWords = query.toLowerCase().split(" ").filter(word => word !== "");

  const filteredList = Object.values(Symptoms).filter(symptom => {
    const s = symptom.toLowerCase();
    const matches = queryWords.some(word => s.includes(word));
    const isNotPicked = !selected.includes(symptom);
    return matches && isNotPicked;
  }).slice(0, 5);

  const selecting = (symptomName: string) => {
    setSelected(prev => [...prev, symptomName]);
    setQuery(""); 
  };

  const removeSymptom = (name: string) => {
    setSelected(prev => prev.filter(item => item !== name));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center font-sans text-slate-800">
      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Selected Items Container */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Selected Symptoms ({selected.length})
          </h2>
          <div className="flex flex-wrap gap-2 min-h-10 p-3 rounded-xl bg-white border border-slate-200 shadow-sm max-h-32 overflow-y-auto transition-all">
            {selected.length === 0 && (
              <p className="text-sm text-slate-300 italic">No symptoms selected...</p>
            )}
            {selected.map((item) => (
              <div 
                key={item} 
                className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-medium border border-amber-200 animate-in fade-in zoom-in duration-200"
              >
                {item}
                <button 
                  onClick={() => removeSymptom(item)}
                  className="hover:text-amber-600 transition-colors leading-none text-lg"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Search Input Section */}
        <section className="relative">
          <label htmlFor="type" className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">
            Search Symptoms
          </label>
          <input 
            className="w-full h-12 px-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all bg-white"
            placeholder="e.g. Headache, Fever..."
            maxLength={50} 
            value={query} 
            id="type" 
            type="text"
            onChange={(e) => setQuery(e.target.value)} 
          />

          {/* Results Dropdown */}
          {queryWords.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
              {filteredList.length > 0 ? (
                filteredList.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => selecting(symptom)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-amber-50 hover:text-amber-900 transition-colors border-b border-slate-50 last:border-none"
                  >
                    {symptom}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-slate-400 italic">No matches found</div>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}