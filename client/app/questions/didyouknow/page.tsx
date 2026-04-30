
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import AnimatedGraph from "../../../components/QuestioPage/AnimatedGraph"; 
import ButtonPushRoute from "@/components/QuestioPage/ButtonPushRoute";
export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">

        <p className="text-xl font-bold text-center"> Something shifts around week 4 —
and it's worth knowing about.</p>

 <p className="text-center">  Pain tends to ease just as energy starts to rise. The two lines cross,
and from there, most people feel the momentum flip in their favor.
 </p>
<AnimatedGraph
  xLabels={["Week 0","Week 2","Week 4","Week 6","Week 8"]}
  animate={false}
  series={[
    { name: "Pain score", color: "#E24B4A", values: [8, 6.5, 5, 3.2, 2] },
    { name: "Energy",     color: "#378ADD", values: [3, 4.2, 5, 6.8, 8] }
  ]}
  unit="/ 10" yLabel="Score (1–10)"
/>
<p className="text-neutral-400 text-sm"> The first few weeks can feel like effort without reward — that's normal. Trust the process a little longer than feels comfortable.</p>

<ButtonPushRoute text="Keep going →" route="/questions/7"/>


      </main>

      <Footer/>

    </div>
  );
}