"use client";

import { Jpg, Pdf } from "@/components/icons";
import React from "react";
import { FileOptions } from "./file-options";
import { TRecordsFile } from "@/types/records";
import { truncateString } from "@/helper/trimString";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type FileProps = {
  data: TRecordsFile;
};

const FileCard = ({ data }: FileProps) => {
  const id = data.id;
  const filename = data.filename ?? (data as any).title ?? "";
  const date = data.created_at ?? (data as any).date;
  const description = data.description ?? "";
  const size = data.size ?? (data as any).file_size;

  const isMdOrSmaller = useMediaQuery("(max-width: 768px)");
  const isMdOrLarger = useMediaQuery("(min-width: 768px)");

  return (
    <div className="py-[12px] flex md:flex-row flex-col justify-between md:items-center items-start gap-[12px] border-b group">
      <div className="w-full flex-1 flex justify-between items-center">
        <div className="flex gap-x-[14px] items-center">
          {FileSwitch(filename)}
          <span className="text-black text-[14px] font-[700] leading-[18.2px]">
            {filename}
          </span>
        </div>
        {isMdOrSmaller && (
          <span className="flex items-center border rounded-full p-1">
            <FileOptions
              id={id}
              fileData={{ filename, created_at: date, description }}
            />
          </span>
        )}
      </div>
      <div className="flex-1 w-full">
        <div className="w-full flex items-center justify-between text-[14px] text-[#83868B] font-[600] leading-[18.2px]">
          <span className="">{truncateString(description, 16)}</span>
          <span className="">{date ?? "12/8/2024"}</span>
          <span className="flex gap-x-[12px] item-center">
            <span>{size ?? "- MB"}</span>
            {isMdOrLarger && (
              <span className="flex items-center group-hover:opacity-100 opacity-0">
                <FileOptions
                  id={id}
                  fileData={{ filename, created_at: date, description }}
                />
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

const FileSwitch = (fileName: string | undefined) => {
  const name = fileName ?? "";
  const fileExtension = name.split(".").pop()?.toLowerCase();

  switch (fileExtension) {
    case "pdf":
      return <Pdf />;
    case "jpg":
    case "jpeg": // Handle both 'jpg' and 'jpeg'
      return <Jpg />;
    default:
      return <Pdf />; // Replace with a default component
  }
};

export default FileCard;
