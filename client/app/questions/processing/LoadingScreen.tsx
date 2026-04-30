'use client'
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const RAINBOW = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-blue-400",
];

// Each step has its own duration — intentionally uneven
const STEP_DURATIONS = [3000, 5000, 2500, 6000, 3500];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface LoadingScreenProps {
  items: [string, string, string, string, string];
  route: string;
  onComplete?: () => void;
}

export default function LoadingScreen({ items, route, onComplete }: LoadingScreenProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [barWidths, setBarWidths] = useState<number[]>(items.map(() => 0));
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef(0);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const duration = STEP_DURATIONS[currentRef.current];
      const rawT = Math.min(elapsed / duration, 1);
      const easedT = easeInOutCubic(rawT);

      setBarWidths((prev) => {
        const next = [...prev];
        next[currentRef.current] = easedT * 100;
        return next;
      });

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const next = currentRef.current + 1;
        if (next >= items.length) {
          setDone(true);
          onComplete?.();
        } else {
          currentRef.current = next;
          setCurrent(next);
          startRef.current = null;
          rafRef.current = requestAnimationFrame(animate);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isCompleted = i < current;
        const isCurrent = i === current && !done;

        return (
          <div key={i} className="flex flex-col gap-1">
            <span className={`text-sm ${isCompleted ? "text-black/30" : isCurrent ? "text-black" : "text-black/20"}`}>
              {item}
            </span>
            <div className="h-0.5 w-full rounded-full bg-black/10">
              <div
                className={`h-full rounded-full ${RAINBOW[i]}`}
                style={{ width: `${barWidths[i]}%`, transition: "width 80ms ease-out" }}
              />
            </div>
          </div>
        );
      })}

      <div
        className="mt-2 overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: done ? "48px" : "0px", opacity: done ? 1 : 0 }}
      >
        <button
  onClick={() => router.push(route)}
  className="mt-1 block mx-auto text-xl text-black underline underline-offset-4 hover:text-green-600 transition-colors duration-200"
>
  Continue →
</button>
      </div>
    </div>
  );
}