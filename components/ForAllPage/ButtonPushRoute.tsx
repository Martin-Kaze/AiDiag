'use client'
import { Button } from "../ui/button"
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { setField } from "@/state/slices/UserInputSlice";

interface ButtonProps {
    text: string;
    classname?: string;
    route: string;
    action?: () => void;
    dispatcher? : { key : string, value : any};
    disabled? : boolean;
}

const ButtonPushRoute = (props: ButtonProps) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClick = () => {
        router.push(props.route);
        if (props.action) {
            props.action();
        }
        if(props.dispatcher){
          dispatch(setField(props.dispatcher))
        }
    };

    return (
        <Button
            disabled={props.disabled} 
            onClick={handleClick} 
            className={props.classname}
        > 
            {props.text} 
        </Button>
    );
}

export default ButtonPushRoute;