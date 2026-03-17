import Button from "@/components/buttons/button";
import React from "react";

const NoFileFolder = () => {
  return (
    <div className="w-full h-[250px] flex flex-col justify-center items-center gap-y-[1rem]">
      <h4 className="text-2xl font-[800] text-black">No Files Found</h4>
      <span className="text-gray-400 font-semibold text-md text-center w-full">
        You can upload a new file or folder
      </span>

      <div className="flex md:flex-row flex-col md:gap-1 gap-1">
        <Button
          text="Add File"
          className="md:block hidden md:py-[12px] md:px-[40px]"
          buttonAttributes={{
            onClick: () => document.getElementById("add-file")?.click(),
          }}
        />
        <Button
          text="Add Folder"
          className="md:block hidden md:py-[12px] md:px-[40px]"
          buttonAttributes={{
            onClick: () => document.getElementById("add-folder")?.click(),
          }}
        />
      </div>
    </div>
  );
};

export default NoFileFolder;
