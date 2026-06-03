import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface HeroProps {
  heading?: string;
  subheading?: string;
  description?: string;
  image?: { src: string; alt: string };
  buttons?: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
  };
  className?: string;
}

const Hero = ({
  heading = "Wellness AI",
  subheading = "built to help you, be better",
  description =
    "Analyse your behaviour, social media, and daily patterns to help you become calmer, healthier and more at peace.",
  buttons = {
    primary: { text: "Get Started", url: "/login" },
    secondary: { text: "Read Terms", url: "/terms" },
  },
  image = { src: "/h.svg", alt: "App screen" },
  className,
}: HeroProps) => {
  return (
    <section className={cn("relative min-h-screen overflow-hidden bg-stone-50", className)}>

      {/* Background texture blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-rose-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center gap-16 px-6 lg:flex-row lg:gap-20 lg:px-16">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-6 lg:w-[55%]">

          <Badge variant="outline" className="w-fit rounded-full border-stone-300 bg-white/80 px-4 py-1.5 text-xs font-medium text-stone-500 shadow-sm">
            ✦ Clinically informed · AI-powered
          </Badge>

          <div className="space-y-1">
            <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-stone-900">
              {heading}
            </h1>
            <p className="text-[clamp(2rem,4.5vw,4rem)] font-light italic leading-[1.1] text-stone-400">
              {subheading}
            </p>
          </div>

          <Separator className="w-12 bg-stone-300" />

          <p className="max-w-md text-[15px] leading-relaxed text-stone-500">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button asChild size="lg" className="group rounded-full bg-stone-900 px-8 text-stone-50 hover:bg-stone-700">
              <a href={buttons.primary?.url}>
                {buttons.primary?.text}
                <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild variant="ghost" className="rounded-full text-stone-400 underline underline-offset-4 hover:text-stone-700">
              <a href={buttons.secondary?.url}>{buttons.secondary?.text}</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-2">
            {[
              { value: "2,400+", label: "active users" },
              { value: "94%", label: "calmer in 2 weeks" },
              { value: "4.9★", label: "avg rating" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-6">
                {i > 0 && <Separator orientation="vertical" className="h-8 bg-stone-200" />}
                <div>
                  <p className="text-lg font-semibold text-stone-800">{stat.value}</p>
                  <p className="text-xs text-stone-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — phone only, your images ── */}
        <div className="relative flex items-center justify-center lg:w-[45%]">

        

        
<img src={'/well.svg'}/>
         
        
         

        </div>
      </div>
    </section>
  );
};

export { Hero };