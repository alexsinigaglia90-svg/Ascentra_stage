import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-pink-200",
        className
      )}
      {...props}
    />
  );
}
