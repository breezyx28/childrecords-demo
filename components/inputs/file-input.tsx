"use client";

import React, { useState, InputHTMLAttributes, useEffect } from "react";
import ValidationError from "../states/errors/validationError";
import { UseFormWatch } from "react-hook-form";
import { Upload01 } from "untitledui-js";
import { twMerge } from "tailwind-merge";

type FileInputProps = {
  label?: string;
  inputName: string;
  option: {
    error?: any;
  };
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  watch?: UseFormWatch<any>;
};

const FileInput = ({
  label,
  inputProps,
  inputName,
  option: { error },
  watch,
}: FileInputProps) => {
  const file = watch ? watch(inputName) : null;
  const [uploadedFilename, setUploadedFilename] = useState(null);

  useEffect(() => {
    if (file && file[0]) {
      console.log("file: ", file[0]);

      setUploadedFilename(file[0]?.name);
    } else {
      setUploadedFilename((label as any) ?? null);
    }
  }, [file]);

  return (
    <div className={twMerge("flex flex-col gap-y-[8px] input-container")}>
      <label
        htmlFor="file-upload"
        className={twMerge(
          "py-[14px] w-full flex items-center justify-center border-2 rounded-[16px] cursor-pointer",
          error ? "border-error-600" : "border-[#DBE0E8]"
        )}
      >
        <div className="flex flex-col items-center ustify-center gap-y-[8px] text-[#83868B]">
          <Upload01 />
          <span
            className={twMerge(
              "text-center text-[16px] font-[500] leading-[19.84px]",
              uploadedFilename === label || uploadedFilename === null
                ? ""
                : "text-primary-600"
            )}
          >
            {uploadedFilename ? uploadedFilename : label}
          </span>
        </div>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          {...inputProps}
        />
      </label>
      {error && <ValidationError text={error} />}
    </div>
  );
};

export default FileInput;
