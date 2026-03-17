"use client";

import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import ValidationError from "../states/errors/validationError";
import "@/styles/components/inputs.css";

type InputProps = {
  option: {
    icon?: ReactNode;
    placeholder?: string;
    error: any;
  };
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

function PasswordInput({
  option: { icon, placeholder, error },
  inputProps,
}: InputProps) {
  const [viewPassword, setViewPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value); // Checks if there is a value on blur
  };

  return (
    <div className={`input-container ${isFocused ? "input-focused" : ""}`}>
      <div
        className={`input-section ${
          error ? "border-error-600" : "border-[#DBE0E8]"
        }`}
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
            type={viewPassword ? "text" : "password"}
            className="w-full"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="absolute ltr:right-0 rtl:left-0">
            <div
              className="block cursor-pointer"
              onClick={() => setViewPassword(!viewPassword)}
            >
              <Eye opened={!viewPassword} />
            </div>
          </div>
        </div>
      </div>
      {error && <ValidationError text={error} />}
    </div>
  );
}

type EyeProps = {
  opened: boolean;
};

const Eye = ({ opened }: EyeProps): ReactNode => {
  return opened ? (
    <svg
      width={20}
      height={20}
      className="text-[#585A5D]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z" />
    </svg>
  ) : (
    <svg
      width={20}
      height={20}
      className="text-[#585A5D]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 10s3.5 4 10 4 10-4 10-4" />
      <path d="M4 11.645 2 14" />
      <path d="m22 14-1.996-2.352" />
      <path d="M8.914 13.68 8 16.5" />
      <path d="M15.063 13.688 16 16.5" />
    </svg>
  );
};

export default PasswordInput;
