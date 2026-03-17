"use client";

import React, { useState, InputHTMLAttributes, useEffect } from "react";
import "@/styles/components/inputs.css";
import ValidationError from "../states/errors/validationError";
import { UseFormWatch } from "react-hook-form";

type FileUploadInputProps = {
  label?: string;
  option: {
    error?: any;
    defaultValue?: string;
  };
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  watch?: UseFormWatch<any>;
};

const FileUploadInput = ({
  label,
  inputProps,
  option: { error, defaultValue },
  watch,
}: FileUploadInputProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    defaultValue as any
  );

  // Sync when defaultValue is set after mount (e.g. when child info loads)
  useEffect(() => {
    if (defaultValue) setSelectedImage(defaultValue);
  }, [defaultValue]);

  // Use watch to observe the "photo" field only if watch is provided
  const photo = watch ? watch("photo") : null;

  useEffect(() => {
    if (photo && photo[0]) {
      const imageUrl = URL.createObjectURL(photo[0]);
      setSelectedImage(imageUrl);

      // Clean up URL when component unmounts or image changes
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [photo]);

  return (
    <div className="flex flex-col items-center gap-y-[8px]">
      <label htmlFor="profile-upload" className="profile-upload-input">
        <input
          type="file"
          id="profile-upload"
          className="hidden"
          {...inputProps}
        />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="size-full object-cover rounded-full"
          />
        ) : (
          <img
            src="/assets/icons/inputs/camera.svg"
            alt="Camera icon"
            className="w-[40px]"
          />
        )}
      </label>

      {label && (
        <p className="text-black text-[14px] font-[600] leading-[18.2px]">
          {label}
        </p>
      )}
      {error && <ValidationError text={error} />}
    </div>
  );
};

export default FileUploadInput;
