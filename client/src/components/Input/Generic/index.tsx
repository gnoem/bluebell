import React, { useEffect, useRef } from "react";
import { IInputProps } from "types";

interface IGenericInputProps extends IInputProps {
  type: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
  autoFocus?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: any; //fixme
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  min?: string;
  max?: string;
}

const Generic: React.FC<IGenericInputProps> = ({ type, name, label, onChange, autoFocus, style, className, width, ...elementProps }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus, inputRef]);
  return (
    <div style={style ?? {}} className={className ?? ''}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        ref={inputRef}
        name={name}
        type={type}
        onChange={onChange}
        autoComplete="off"
        style={{ width }}
        {...elementProps}
      />
    </div>
  )
}

export default Generic;