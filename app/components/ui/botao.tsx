
import { ButtonHTMLAttributes, ReactNode } from "react";

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export default function Botao({ children, variant = "primary", className = "", ...props }: BotaoProps) {
  const baseStyles = "text-xs font-light tracking-wide px-5 py-3 rounded-xl transition-colors cursor-pointer";
  
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-900",
    secondary: "bg-neutral-100 text-black hover:bg-neutral-200",
    outline: "border border-black/20 text-black hover:bg-black hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
