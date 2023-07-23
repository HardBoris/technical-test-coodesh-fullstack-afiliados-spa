import { ReactNode } from "react";
import "./form.style.css";

interface FormularioProps {
  children: ReactNode;
  onSubmit?: () => void;
}

export const Formulario = ({ children, ...rest }: FormularioProps) => (
  <form {...rest}>{children}</form>
);
