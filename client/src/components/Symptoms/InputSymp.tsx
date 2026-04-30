export function Input(props: { query: string; setQuery: (val: string) => void }) {
  return (

        <div className="flex flex-col ">
        <label
        className="block text-m font-medium text-slate-600 mb-1.5 ml-1" 
        htmlFor="type"> Search Symptoms: 
        </label>

        <input 
        placeholder="e.g. Headache, Fever..." 
        className="w-100 h-12 px-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white" maxLength={50} value={props.query} id="type" type="text"
        onChange={(data) => props.setQuery(data.currentTarget.value)}
         />
         
    </div>
  )
}