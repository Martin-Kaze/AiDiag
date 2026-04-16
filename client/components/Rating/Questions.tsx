import { useEffect, useState } from 'react'
import {  useDispatch } from "react-redux"
import { off } from '@/state/slices/PopUpSlice';
import AddingSymp from '@/symptsend';

import { HowLong } from "./HowLong";
import { HowStrong } from "./HowStrong";

export function Questions(props: { selected: string[]; setPopup: React.Dispatch<React.SetStateAction<boolean>> }) {

    const dispatch = useDispatch();
    const [index, setindex] = useState<number>(0);
    const [selectedRadio, setSelectedRadio] = useState<string>("");
    const [selectedRange, setselectedRange] = useState<number>(50);

    useEffect(() => {
        if (props.selected.length == 0) {
            props.setPopup(false);
            dispatch(off());
        }
    }, [props.selected.length])


    const ClickPopUP = () => {
        if (index == props.selected.length - 1) {
            props.setPopup(false);
            dispatch(off());
        }
    }

    const [isBouncing, setIsBouncing] = useState(false);
    const [isempty, setisempty] = useState(false);

    const handleClick = () => {
        setIsBouncing(true);
        setTimeout(() => {
            setIsBouncing(false);
        }, 2000);

    };

    const settingData = () => {
        if (selectedRadio.length == 0) { setisempty(true) } else { setisempty(false) }
        setindex(index + 1);
        AddingSymp(props.selected[index],selectedRange, selectedRange, (index == props.selected.length - 1));  setSelectedRadio(""); setselectedRange(50); handleClick(); ClickPopUP()
    }
    
    
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-3'>
            <HowStrong selected={props.selected} index={index} selectedRange={selectedRange} setselectedRange={setselectedRange} />
            <HowLong selected={props.selected} index={index} SelectedRadio={selectedRadio} setSelectedRadio={setSelectedRadio} />
            <button onClick={settingData}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-all
        ${isBouncing ? 'animate-pulse' : ''} ${isempty ? 'bg-red-600' : ''}
      `}> NEXT </button>

        </div>


    )
}