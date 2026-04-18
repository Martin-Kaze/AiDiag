"use client"
import { useEffect, useState } from "react"

 export default function TypeWriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i))
      i++
      if (i > text.length) clearInterval(interval)
    }, 50) // speed — lower = faster

    return () => clearInterval(interval)
  }, [text])

  return <span>{displayed}</span>
}