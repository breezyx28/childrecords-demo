"use client";

import React, { useState, useEffect } from "react";
import ValidationError from "../states/errors/validationError";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { twMerge } from "tailwind-merge";
import { UseFormSetValue } from "react-hook-form";

// Type Definitions
type InputProps = {
  option: {
    optionsData: { value: string; text: any }[]; // Options for the dropdown
    placeholder?: string; // Placeholder text
    error?: string; // Validation error message
    className?: string; // Additional class names
    shadow?: boolean; // Enable/Disable shadow
    withSearch?: boolean; // Enable/Disable search bar
    defaultValue?: any;
  };
  name: string;
  setValue: UseFormSetValue<any>;
};

function AutocompleteInput({
  option: {
    optionsData,
    placeholder = "Select an option",
    error,
    className,
    shadow = false,
    withSearch = false,
    defaultValue,
  },
  name,
  setValue,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null
  );

  // Synchronize `selectedValue` with `defaultValue` when `defaultValue` changes
  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    selectedOption: { value: string; text: string } | null
  ) => {
    setSelectedValue(selectedOption ? selectedOption.value : null);
    setValue(name, selectedOption ? selectedOption.value : null);
  };

  return (
    <div className="flex flex-col gap-y-[5px]">
      <div
        className={twMerge(
          "input-wrapper border border-2 rounded-[16px]",
          focused ? "border-[#394cff]" : "border-[#DBE0E8]",
          error ? "border-error-600" : "",
          shadow ? "shadow-md" : "",
          className
        )}
      >
        <Autocomplete
          disablePortal={!withSearch} // Disable portal if search is disabled
          options={optionsData} // Pass full optionsData
          getOptionLabel={(option) => option.text} // Display the text (e.g., 🇸🇩 Sudan)
          value={
            optionsData.find((item) => item.value === selectedValue) || null
          }
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              InputProps={{
                ...params.InputProps,
                className: twMerge("!font-lexend", params.InputProps.className),
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "14px", // Adjust label text size
                  fontFamily: "var(--font-nunito)",
                  color: "#83868B", // Label text color
                  lineHeight: "20.8px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  top: "7px",
                  color: "#83868B", // Change label color on focus
                  transform: "translate(16px, -6px) scale(0.85)",
                },
                "& .MuiInputLabel-shrink": {
                  top: "7px", // Adjust position when input is focused or filled
                  transform: "translate(16px, -6px) scale(0.85)",
                },
                "& .MuiOutlinedInput-root": {
                  height: "auto", // Make input height auto
                  borderRadius: "16px", // Set border radius
                  "& fieldset": {
                    borderColor: "transparent", // Set border color to primary-600
                    border: 0, // Set border color to primary-600
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent", // Apply Tailwind's primary-600 class
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent", // Apply Tailwind's primary-600 class on focus
                  },
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-input.MuiOutlinedInput-input::placeholder": {
                    opacity: 1,
                    color: "#83868B",
                  },
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.text}
            </li>
          )}
          sx={{ width: "100%" }}
        />
      </div>
      {error && <ValidationError text={error} />}
    </div>
  );
}

export default AutocompleteInput;
