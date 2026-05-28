'use client'
import { Menu } from "@/components/ForAllPage/Menu";
import { useRef, useState } from "react";
import ExplainMore from "@/app/test/ExplainMore";
import { useEffect } from "react";
import { handleSubmit } from "./test";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function Home() {
const value = useSelector((val: RootState) => val.UserInputReducer.selections);
const sub = useSelector((val: RootState) => val.UserInputReducer.list);
 const called = useRef(false)

const [aiData, setAiData] = useState(null)

useEffect(() => {
  if (called.current) return
  called.current = true

  const run = async () => {
    const data = await handleSubmit({
      value,
      sub,
    })

    setAiData(data)
  }

  run()
}, [])

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">

        <p className="text-3xl font-bold text-center"> One of your sympotms AI asalised: </p>

      {(aiData == null) ? null : <ExplainMore data={aiData}/> }
      
      
      
      
      </main>

      <footer className="border-t p-2 ">
        <p className="text-neutral-700">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}