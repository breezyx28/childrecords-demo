"use client";

import React, { ReactNode, useState } from "react";
import "@/styles/components/inputs.css";
import { twMerge } from "tailwind-merge";
import { UseFormSetValue } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import { Calendar } from "../icons";
import { AlertCircle } from "untitledui-js";

type DatetimeInputProps = {
  option: {
    icon?: ReactNode;
    placeholder?: string;
    error?: any;
    className?: string;
    shadow?: boolean;
    dateFormat?: string;
  };
  name: string;
  setValue?: UseFormSetValue<any>;
};

function DatetimeInputMui({
  option: {
    icon,
    placeholder = "Date and Time",
    dateFormat = "DD/MM/YYYY HH:mm",
    className,
    error,
  },
  name,
  setValue,
}: DatetimeInputProps) {
  const [focused, setFocused] = useState(false);
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  // Handle Date Change
  const handleChange = (newDate: Dayjs | null) => {
    setDateValue(newDate);
    if (setValue) setValue(name, newDate ? newDate.format(dateFormat) : "");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col gap-y-[5px]">
        <div
          className={twMerge(
            "input-wrapper border border-2 rounded-[16px]",
            focused ? "border-[#394cff]" : "border-[#DBE0E8]",
            error ? "border-error-600" : ""
          )}
        >
          <DateTimePicker
            className="w-full py-[15px]"
            label={placeholder}
            value={dateValue}
            onChange={handleChange}
            format={dateFormat}
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={twMerge(`${className ?? ""} w-full date-input`)}
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
                        // Set border width
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
                        paddingY: "15px",
                      },
                    },
                  }}
                />
              ),
              openPickerIcon: () => <Calendar />, // Replace the default calendar icon
            }}
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
    </LocalizationProvider>
  );
}

export default DatetimeInputMui;
