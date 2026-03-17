import Button from "@/components/buttons/button";
import { SelectMenu } from "@/components/inputs/select-menu";
import { SearchIcon } from "lucide-react";
import React from "react";

interface FileToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDateFilter: string;
  setSelectedDateFilter: (filter: string) => void;
}

const FileToolbar: React.FC<FileToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDateFilter,
  setSelectedDateFilter,
}) => {
  const dateOptions = [
    { name: "Now", value: "now" },
    { name: "Last Week", value: "last_week" },
    { name: "Last Month", value: "last_month" },
    { name: "All", value: "all" },
  ];

  return (
    <div className="w-full flex justify-between gap-x-[12px] mt-[0.75rem] max-h-[50px]">
      <div className="md:min-w-[200px] min-w-[0px] w-full flex items-center gap-x-[8px] outline-none rounded-[8px] border p-[10px]">
        <SearchIcon size={16} />
        <input
          type="text"
          placeholder="Search files"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-0 text-[#83868B] text-[14px] leading-[18.2px] focus:outline-none focus:ring-0"
        />
      </div>

      <SelectMenu
        options={dateOptions}
        value={selectedDateFilter}
        onChange={(value) => setSelectedDateFilter(value)}
        customTrigger={<div>{selectedDateFilter || "Filter By Date"}</div>}
        className="!md:max-w-[160px] !max-w-auto p-[14px] h-full w-full"
      />
      <Button
        text="Add"
        className="md:block hidden md:py-[12px] md:px-[40px]"
        buttonAttributes={{
          onClick: () => document.getElementById("add-file")?.click(),
        }}
      />
    </div>
  );
};

export default FileToolbar;
