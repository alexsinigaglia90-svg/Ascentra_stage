"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={cn(
        "rounded-2xl px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300",
        variant === "primary" && "bg-ink text-white shadow-glow hover:opacity-95",
        variant === "secondary" && "glass text-ink hover:bg-white/80",
        variant === "ghost" && "bg-transparent text-ink hover:bg-white/50",
        className
      )}
      {...props}
    />
  );
}
