"use client";

import React, { ReactNode, useState } from "react";
import ValidationError from "../states/errors/validationError";
import { TextField } from "@mui/material"; // MUI TextField
import { twMerge } from "tailwind-merge";
import { AlertCircle } from "untitledui-js";
import { defaultStyle } from "./prefrences";

type InputProps = {
  option: {
    type: "number" | "text" | "email" | "tel" | "date";
    icon?: ReactNode;
    placeholder?: string;
    error?: any;
    className?: string;
    shadow?: boolean;
    focuseState?: boolean;
  };
  inputProps?: any; // MUI's TextField has a more specific props type
};

function InputMui({
  option: {
    type,
    icon,
    placeholder,
    className,
    error,
    shadow = false,
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

  return (
    <div className="flex flex-col gap-y-[5px]">
      <div
        className={twMerge(
          "input-wrapper border border-2 rounded-[16px]",
          isFocused ? "border-[#394cff]" : "border-[#DBE0E8]",
          error ? "border-error-600" : ""
        )}
      >
        <TextField
          {...inputProps}
          label={placeholder}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          fullWidth
          slotProps={{
            input: {
              endAdornment: icon && <div className="input-icon">{icon}</div>,
            },
            inputLabel: {
              shrink: isFocused || hasValue,
            },
          }}
          className={twMerge("input-textfield", className)}
          sx={defaultStyle}
        />
      </div>
      {error && (
        <div className="flex items-center gap-x-[4px]">
          <AlertCircle stroke={"#FF5135"} width={20} height={21} />
          <p className="text-error-600 text-[14px] font-normal leading-[20.72px]">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default InputMui;
