import { useState } from 'react'
import { useSelector  } from "react-redux"
import type { RootState } from "../../../../AiDiag/client/src/state/store"

import { Questions } from './Questions';


function RatingSymptom() {

    const selected = useSelector((state: RootState) => state.SymptomsReduce.selected);
    const show = useSelector( (state : RootState) => state.DispalyRecude.show)
    const [Popup, setPopup] = useState<boolean>(true)

    return (

        <div 
        className={`${ (Popup || show) ? 'flex' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-2 backdrop-blur-sm`}
        >
            <div
            className='flex h-3/5 w-3/5 items-center justify-center z-50 bg-white drop-shadow-[0_0_15px_rgba(79,70,229,0.8)] p-2 rounded-xl '
            >
                <div className='flex flex-col'>

                    <h1 className=" text-xl font-medium text-slate-700 "> 
                     Please rate your symptoms </h1>
                    <Questions selected={selected} setPopup={setPopup} />
                </div>
            </div>
        </div>

    )
}

export default RatingSymptom