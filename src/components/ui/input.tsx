"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // base
          "flex h-10 w-full rounded-md px-3 py-2 text-sm",
          "outline-none transition-colors",
          // transparent look
          "bg-transparent text-white placeholder-white/60",
          "border border-white/25 focus:border-white/50",
          "focus-visible:ring-2 focus-visible:ring-white/30",
          // keep file input sane + disabled styles
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
export { Input };
