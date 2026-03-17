import Button from "@/components/buttons/button";
import { SelectMenu } from "@/components/inputs/select-menu";
import { SearchIcon } from "lucide-react";
import React from "react";
import FolderButton from "./folder-button";

interface FolderToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDateFilter: string;
  setSelectedDateFilter: (filter: string) => void;
}

const Toolbar: React.FC<FolderToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDateFilter,
  setSelectedDateFilter,
}) => {
  const dateOptions = [
    { name: "All", value: "all" },
    { name: "Now", value: "now" },
    { name: "Last Week", value: "last_week" },
    { name: "Last Month", value: "last_month" },
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
          className="md:min-w-[200px] min-w-[0px] bg-transparent border-0 text-[#83868B] text-[14px] leading-[18.2px] focus:outline-none focus:ring-0"
        />
      </div>

      <SelectMenu
        options={dateOptions}
        value={selectedDateFilter}
        onChange={(value) => setSelectedDateFilter(value)}
        customTrigger={<div>{selectedDateFilter || "Filter By Date"}</div>}
        className="!md:max-w-[160px] !max-w-auto p-[14px] h-full w-full"
      />
      <FolderButton
        text="Add File"
        buttonAttributes={{
          onClick: () => document.getElementById("add-file")?.click(),
        }}
        className="md:!block !hidden"
      />
      <FolderButton
        text="Add Folder"
        buttonAttributes={{
          onClick: () => document.getElementById("add-folder")?.click(),
        }}
        className="md:!block !hidden"
      />
    </div>
  );
};

export default Toolbar;
