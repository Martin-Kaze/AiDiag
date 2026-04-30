export function HowLong(props: { selected: string[]; index: number; SelectedRadio: string; setSelectedRadio: React.Dispatch<React.SetStateAction<string>> }) {

    return (<div className="max-w-md p-4 bg-white rounded-xl shadow-sm border border-slate-100">
        <div className=" truncate mb-4">
            <p className="text-xs uppercase tracking-wider  text-slate-400 font-semibold">Selected Symptom</p>
            <p className="text-lg font-medium line-clamp-2 text-slate-800">{props.selected?.[props.index] || "Selected a symptom"}</p>

            <label htmlFor="huey" className="block text-sm font-medium text-slate-600 mb-6">
                For how long you had this?
            </label>
            <div>
                <input type="radio" id="huey" name="drone" value="huey" checked={props.SelectedRadio === "huey"} onChange={() => props.setSelectedRadio("huey")} />
                <label htmlFor="huey">Huey</label>
            </div>

            <div>
                <input type="radio" id="dewey" name="drone" value="dewey" checked={props.SelectedRadio === "dewey"} onChange={() => props.setSelectedRadio("dewey")} />
                <label htmlFor="dewey">Dewey</label>
            </div>

            <div>
                <input type="radio" id="louie" name="drone" value="louie" checked={props.SelectedRadio === "louie"} onChange={() => props.setSelectedRadio("louie")} />
                <label htmlFor="louie">Louie</label>
            </div>

            <div>
                <input type="radio" id="souie" name="drone" value="souie" checked={props.SelectedRadio === "souie"} onChange={() => props.setSelectedRadio("souie")} />
                <label htmlFor="souie">Souie</label>
            </div>
        </div>
    </div>)

}
