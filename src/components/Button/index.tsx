import { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.style.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: string;
}

export const Button = ({ children, variant, ...rest }: ButtonProps) => (
  <div className="btn">
    <button {...rest} className={variant ? `neutro ${variant}` : "neutro"}>
      {children}
    </button>
  </div>
);
