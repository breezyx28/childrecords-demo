import { Folder } from "@/components/icons";
import { TRecordsFolder } from "@/types/records";
import { Link } from "react-router-dom";
import React from "react";
import { FolderOptions } from "./folder-options";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type FolderProps = {
  data: TRecordsFolder;
};

const FolderCard = ({
  data: { created_at: date, filename, files, size, id },
}: FolderProps) => {
  const isMdOrSmaller = useMediaQuery("(max-width: 768px)");
  const isMdOrLarger = useMediaQuery("(min-width: 768px)");

  return (
    <div className="py-[12px] flex md:flex-row flex-col justify-between md:items-center items-start gap-[12px] border-b group">
      <div className="w-full flex-1 flex justify-between items-center">
        <Link
          href={`/dashboard/records/${id}`}
          className="flex gap-x-[14px] items-center w-full"
        >
          <Folder />
          <span className="text-black text-[14px] font-[700] leading-[18.2px]">
            {filename}
          </span>
        </Link>
        {isMdOrSmaller && (
          <span className="flex items-center border rounded-full p-1">
            <FolderOptions id={id} />
          </span>
        )}
      </div>
      <div className="flex-1 w-full">
        <div className="w-full flex items-center justify-between text-[14px] text-[#83868B] font-[600] leading-[18.2px]">
          <Link to={`/dashboard/records/${id}`} className="w-full">
            {files ?? 0} Files
          </Link>
          <Link to={`/dashboard/records/${id}`} className="w-full">
            {date ?? "--/--/----"}
          </Link>
          <span className="flex gap-x-[12px] item-center">
            <Link to={`/dashboard/records/${id}`} className="w-full">
              {size ?? "- MB"}
            </Link>
            {isMdOrLarger && (
              <span className="flex items-center group-hover:opacity-100 opacity-0">
                <FolderOptions id={id} />
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
