import { forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-body text-xs tracking-[0.15em] uppercase text-earth mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full font-body text-sm bg-transparent border-b border-sand py-3 px-0",
            "placeholder:text-text-muted placeholder:font-light",
            "focus:outline-none focus:border-gold transition-colors duration-300",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 font-body text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
