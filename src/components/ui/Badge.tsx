import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "new" | "bestseller" | "sale";
  className?: string;
}

export function Badge({ children, variant = "new", className }: BadgeProps) {
  const variants = {
    new: "bg-dark text-cream",
    bestseller: "bg-gold text-dark",
    sale: "bg-earth text-cream",
  };

  return (
    <span
      className={clsx(
        "inline-block font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
