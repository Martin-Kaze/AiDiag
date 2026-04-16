export function HowStrong(props: { selected: string[]; index: number; selectedRange: number; setselectedRange: React.Dispatch<React.SetStateAction<number>> }) {
    return (<div className="max-w-md p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className=" truncate mb-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Selected Symptom</p>
            <p className="text-lg font-medium  text-slate-800">{props.selected?.[props.index] || "Selected a symptom"}</p>
        </div>
        <label htmlFor="howstrong" className="block text-sm font-medium text-slate-600 mb-6">
            How strong is the feeling?
        </label>
        <div className="relative mb-2">
            <input
                id="howstrong"
                type="range"
                min="0"
                max="100"
                step={10}
                value={props.selectedRange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer
        /* Webkit (Chrome/Safari) */
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-6
        [&::-webkit-slider-thumb]:h-6
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-amber-500
        [&::-webkit-slider-thumb]:border-4
        [&::-webkit-slider-thumb]:border-white
        [&::-webkit-slider-thumb]:shadow-md
        /* Firefox */
        [&::-moz-range-thumb]:w-5
        [&::-moz-range-thumb]:h-5
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-amber-500
        [&::-moz-range-thumb]:border-4
        [&::-moz-range-thumb]:border-white
        [&::-moz-range-thumb]:shadow-md
       "
                onChange={(e) => props.setselectedRange(+e.target.value)}
            />

            <div className="flex justify-between mt-3 px-1">
                <div className="flex flex-col items-start">
                    <span className="h-2 w-px bg-slate-300 mb-1 ml-2"></span>
                    <span className="text-xs text-slate-500 font-medium">None</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="h-2 w-px bg-slate-300 mb-1"></span>
                    <span className="text-xs text-slate-500 font-medium">Moderate</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="h-2 w-px bg-slate-300 mb-1 mr-4"></span>
                    <span className="text-xs text-slate-500 font-medium">Severe</span>
                </div>
            </div>
        </div>
    </div>
    )

}
