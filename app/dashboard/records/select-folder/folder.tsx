import { Folder } from "@/components/icons";
import { TRecordsFolder } from "@/types/records";
import React from "react";
import { twMerge } from "tailwind-merge";

type FolderProps = {
  data: TRecordsFolder;
  setSelect: React.Dispatch<React.SetStateAction<null | number>>;
};

const SelecFolder = ({
  data: { id, created_at: date, filename, files, size },
  setSelect,
}: FolderProps) => {
  const [selected, setSelected] = React.useState<boolean>(false);
  return (
    <div
      onClick={() => {
        setSelected(!selected);
        setSelect(selected ? null : id);
      }}
    >
      <div
        className={twMerge(
          `py-[12px] flex md:flex-row flex-col justify-between md:items-center items-start border-b hover:rounded-[8px] cursor-pointer hover:border-2 hover:border-primary-600 hover:p-[12px] transition-all`,
          selected && "border-2 border-primary-600 p-[12px] rounded-[8px]"
        )}
      >
        <div className="w-full flex-1 flex justify-between items-center">
          <div className="flex gap-x-[14px] items-center">
            <Folder />
            <span className="text-black text-[14px] font-[700] leading-[18.2px]">
              {filename}
            </span>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between text-[14px] text-[#83868B] font-[600] leading-[18.2px]">
            <span className="">{files ?? 0} Files</span>
            <span className="">{date ?? "--/--/----"}</span>
            <span className="">{size ?? "- MB"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelecFolder;
