import Search from "@/components/Symptoms/Search";
import RatingSymptom from "@/components/Rating/RatingSymptom";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/CardDEMO";
export default function Home() {
  return (
    <main className="flex flex-col gap-6 p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <Button>Test Button</Button>
        <p className="text-muted-foreground text-sm">Inline text next to button</p>
      </div>

      <CardDemo />
    </main>
  );
}