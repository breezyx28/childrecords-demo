import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import React, { useEffect } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import "@/styles/components/inputs.css";
import ValidationError from "../states/errors/validationError";
import { twMerge } from "tailwind-merge";

interface OtpInputProps {
  setValue: (name: string, value: string) => void;
  name: string;
  error?: any;
  initialValue?: string;
}

export function OtpInput({
  setValue,
  name,
  error,
  initialValue,
}: OtpInputProps) {
  const isFocused = false;
  const hasValue = false;
  const placeholder = "";

  const handleFocus = () => {};

  useEffect(() => {
    if (initialValue) {
      setValue(name, initialValue);
    }
  }, [initialValue, setValue, name]);

  const handleChange = (value: string) => {
    setValue(name, value);
  };

  return (
    <div className={`input-container ${isFocused ? "input-focused" : ""}`}>
      {placeholder && (
        <span className={`input-label text-[#83868B]`}>{placeholder}</span>
      )}

      <div className="input-wrapper">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          onChange={handleChange}
          value={initialValue ?? ""}
        >
          <InputOTPGroup className="w-full !justify-center gap-[1rem] !p-[0px] !bg-transparent">
            {[1, 2, 3, 4, 5, 6].map((value, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={twMerge(
                  "input-section !w-[140px] !h-[50px] !rounded-[8px] !bg-transparent focus:!border-primary-600 focus:!ring-primary-600",
                  error && "border-error-600"
                )}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      {error && <ValidationError text={error} />}
    </div>
  );
}
