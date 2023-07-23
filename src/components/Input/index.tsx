import "./input.style.css";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register?: any;
  name: string;
  error?: any;
  label?: string;
}

export const Input = ({
  label,
  register,
  name,
  placeholder,
  error,
  ...rest
}: InputProps) => {
  return (
    <div className="input-form">
      {label && <div className="input-label">{label}</div>}
      <div className={!!error ? "input-field borded" : "input-field"}>
        <input
          {...(register && { ...register(name) })}
          {...rest}
          className={!!error ? "input-input error" : "input-input"}
          placeholder={!!error ? `${error}` : `${placeholder}`}
        />
      </div>
    </div>
  );
};
