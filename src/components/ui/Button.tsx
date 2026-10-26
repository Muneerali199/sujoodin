import { forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-body tracking-wide transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-dark text-cream hover:bg-earth active:scale-[0.98]",
      secondary:
        "bg-transparent text-dark border border-dark hover:bg-dark hover:text-cream active:scale-[0.98]",
      ghost:
        "bg-transparent text-dark hover:text-gold underline-offset-4 hover:underline",
      gold: "bg-gold text-dark hover:bg-earth active:scale-[0.98]",
    };

    const sizes = {
      sm: "text-xs px-4 py-2",
      md: "text-sm px-6 py-3",
      lg: "text-sm px-8 py-4",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
