"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // base
          "flex min-h-[120px] w-full rounded-md px-3 py-2 text-sm",
          "outline-none transition-colors resize-y",
          // transparent look
          "bg-transparent text-white placeholder-white/60",
          "border border-white/25 focus:border-white/50",
          "focus-visible:ring-2 focus-visible:ring-white/30",
          // disabled styles
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
export { Textarea };
