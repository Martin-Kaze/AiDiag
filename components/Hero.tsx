import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

interface HeroProps {
  heading?: string;
  subheading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
  };
  className?: string;
}

const Hero = ({
  heading = "Wellness.chat",
  subheading = "understand how your YouTube habits shape your wellbeing",
  description = "Wellness.chat connects to your YouTube account (read-only) and uses AI to analyse your subscriptions — giving you personalised insights into how your content habits may be affecting your mental health and daily mood. We never post, modify, or store your YouTube data.",
  buttons = {
    primary: { text: "Get Started", url: "/dashboard" },
    secondary: { text: "Read Terms", url: "/terms" },
  },
  className,
}: HeroProps) => {
  return (
    <section className={cn("relative min-h-screen overflow-hidden bg-stone-50", className)}>
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-rose-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-16 px-6 lg:flex-row lg:gap-20 lg:px-16">
        <div className="flex flex-col gap-6 lg:w-[55%]">
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

          {/* How it works — satisfies Google's "clear purpose" requirement */}
          <ol className="max-w-md space-y-1 text-[13px] text-stone-400">
            <li>1. Connect your YouTube account (read-only)</li>
            <li>2. Our AI analyses your subscriptions</li>
            <li>3. Get personalised wellness insights</li>
          </ol>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              className={buttonVariants({
                size: "lg", // CHANGED = to :
                className: "group rounded-full bg-stone-900 px-8 text-stone-50 hover:bg-stone-700"
              })}
              href={buttons.primary?.url ?? "#"}
            >
              {buttons.primary?.text}
              <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              className={buttonVariants({
                size: "lg", // CHANGED = to :
                className: "group rounded-full bg-stone-900 px-8 text-stone-50 hover:bg-stone-700"
              })}
              href={buttons.secondary?.url ?? "#"}
            >
              {buttons.secondary?.text}
              <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

          </div>
        </div>

        <div className="relative flex items-center justify-center lg:w-[45%]">
          <img src="/well.svg" alt="Wellness illustration" />
        </div>
      </div>
    </section>
  );
};

export { Hero };