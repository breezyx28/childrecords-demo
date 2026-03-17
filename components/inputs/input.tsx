"use client";

import React, { InputHTMLAttributes, ReactNode, useRef, useState } from "react";
import ValidationError from "../states/errors/validationError";
import "@/styles/components/inputs.css";
import { twMerge } from "tailwind-merge";

type InputProps = {
  option: {
    type: "number" | "text" | "email" | "tel" | "date" | "hidden";
    icon?: ReactNode;
    placeholder?: string;
    error?: any;
    className?: string;
    shadow?: boolean;
    defaultValue?: string;
    focuseState?: boolean;
  };
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

function Input({
  option: {
    type,
    icon,
    placeholder,
    className,
    error,
    shadow = false,
    defaultValue,
    focuseState = false,
  },
  inputProps,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(focuseState);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value); // Update `hasValue` only on blur
  };

  React.useEffect(() => {
    if (defaultValue) {
      setHasValue(true);
    }
  }, [defaultValue]);

  return (
    <div className={`input-container ${isFocused ? "input-focused" : ""}`}>
      <div
        className={`input-section ${
          error ? "border-error-600" : "border-[#DBE0E8]"
        }`}
        style={{ boxShadow: shadow ? "0px 1px 2px 0px #1018280D" : "none" }}
        onClick={handleFocus}
      >
        <div className="input-wrapper">
          {placeholder && (
            <span
              className={`input-label ${
                isFocused || hasValue
                  ? "input-label-focused"
                  : "input-label-blur"
              }`}
            >
              {placeholder}
            </span>
          )}
          <input
            {...inputProps}
            type={type}
            className={twMerge(className || "")}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue={defaultValue}
          />
        </div>
        {icon && <div className="input-icon text-[#83868B]">{icon}</div>}
      </div>
      {error && <ValidationError text={error} />}
    </div>
  );
}

export default Input;
