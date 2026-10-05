import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, accent, description, className, children }) {
  return (
    <Reveal className={cn("flex flex-col gap-4", className)}>
      <span className="eyebrow">{eyebrow}</span>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-xl text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl">
          {title} {accent && <span className="font-serif text-[1.08em] font-normal italic text-primary">{accent}</span>}
        </h2>
        {children}
      </div>
      {description && <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>}
    </Reveal>
  );
}
