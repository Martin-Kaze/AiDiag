'use client'
import { Button } from "./ui/button"
import { useRouter } from 'next/navigation';

interface ButtonProps {
    text : string;
    classname? : string;
    route : string;
}

const ButtonPushRoute = ( props : ButtonProps) => {
    const rotuer = useRouter();
  return (
    <Button onClick={ ()=> rotuer.push(props.route)}  className={props.classname}> {props.text} </Button>
  )
}

export default ButtonPushRoute