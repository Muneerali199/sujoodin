import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface OrnamentHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  align?: "center" | "left";
  className?: string;
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center gap-3 text-gold ${className}`}
    >
      <span className="block w-10 sm:w-14 h-px bg-gold/60" />
      <span className="block w-1.5 h-1.5 rotate-45 border border-gold" />
      <span className="block w-10 sm:w-14 h-px bg-gold/60" />
    </span>
  );
}

export function OrnamentHeading({
  id,
  eyebrow,
  title,
  subtitle,
  action,
  align = "center",
  className = "",
}: OrnamentHeadingProps) {
  if (align === "left") {
    return (
      <div
        id={id}
        className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 ${className}`}
      >
        <div>
          {eyebrow && (
            <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-light leading-[1.08] text-dark">
            {title}
          </h2>
          {subtitle && (
            <p className="font-body text-sm text-text-muted leading-relaxed mt-4 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="group inline-flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-forest border-b border-forest/30 pb-1 hover:border-gold hover:text-gold transition-colors shrink-0"
          >
            {action.label}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div id={id} className={`text-center ${className}`}>
      {eyebrow && (
        <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-light leading-[1.08] text-dark">
        {title}
      </h2>
      <Ornament className="mt-5" />
      {subtitle && (
        <p className="font-body text-sm text-text-muted leading-relaxed mt-5 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-forest border-b border-forest/30 pb-1 mt-6 hover:border-gold hover:text-gold transition-colors"
        >
          {action.label}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
