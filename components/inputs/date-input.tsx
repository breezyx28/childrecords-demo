"use client";

import React, { ReactNode, useState, useEffect } from "react";
import ValidationError from "../states/errors/validationError";
import "@/styles/components/inputs.css";
import { twMerge } from "tailwind-merge";
import { UseFormSetValue } from "react-hook-form";

type DateInputProps = {
  option: {
    icon?: ReactNode;
    placeholder?: string;
    error?: any;
    className?: string;
    shadow?: boolean;
    dateFormat?: "dd/mm/yyyy" | "dd-mm-yyyy";
  };
  name: string;
  setValue?: UseFormSetValue<any>;
};

function DateInput({
  option: {
    icon,
    placeholder,
    className,
    error,
    shadow = false,
    dateFormat = "dd/mm/yyyy",
  },
  name,
  setValue,
}: DateInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputType, setInputType] = useState<"text" | "date">("text");
  const [dateValue, setDateValue] = useState("");

  // Format date based on the specified format
  const formatDate = (value: string): string => {
    const [year, month, day] = value.split("-");
    if (dateFormat === "dd/mm/yyyy") {
      return `${day}/${month}/${year}`;
    } else if (dateFormat === "dd-mm-yyyy") {
      return `${day}-${month}-${year}`;
    }
    return value;
  };

  // Switch type to 'date' on focus
  const handleFocus = () => {
    setInputType("date");
    setIsFocused(true);
  };

  // Revert type to 'text' on blur if no date is selected
  const handleBlur = () => {
    if (dateValue) {
      // Format the value on blur if the user has completed the input
      const formattedDate = formatDate(dateValue);
      setDateValue(formattedDate); // update formatted value
      if (setValue) setValue(name, formattedDate); // set the value using react-hook-form
    } else {
      setInputType("text");
    }
    setIsFocused(false);
  };

  // Update dateValue on input change, without formatting in real-time
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value); // Update the raw value without formatting
  };

  // Check for a pre-filled value on mount to adjust the label state if necessary
  useEffect(() => {
    if (dateValue) {
      setIsFocused(true);
    }
  }, [dateValue]);

  return (
    <div className={`input-container ${isFocused ? "input-focused" : ""}`}>
      <div
        className={`input-section ${
          error ? "border-error-600" : "border-[#DBE0E8]"
        }`}
        style={{
          boxShadow: shadow ? "0px 1px 2px 0px #1018280D" : "none",
        }}
        onClick={() => setIsFocused(true)}
      >
        <div className="input-wrapper">
          {placeholder && (
            <span
              className={`input-label ${
                isFocused || dateValue
                  ? "input-label-focused"
                  : "input-label-blur"
              }`}
            >
              {placeholder}
            </span>
          )}
          <input
            type={inputType}
            value={dateValue} // Bind the value directly to the state
            className={twMerge(`${className ?? ""}`)}
            onFocus={handleFocus}
            onBlur={handleBlur} // Trigger the blur handler to format the date
            onChange={handleChange} // Update the value while typing without formatting
          />
        </div>
        {icon && <div className="input-icon">{icon}</div>}
      </div>
      {error && <ValidationError text={error} />}
    </div>
  );
}

export default DateInput;
