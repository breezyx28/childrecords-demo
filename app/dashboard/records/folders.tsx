"use client";

import Loading from "@/app/loading";
import Button from "@/components/buttons/button";
import FolderCard from "@/components/cards/records/folder-card";
import { useGetAllFoldersQuery } from "@/redux/endpoints/records";
import React, { useMemo } from "react";
import Pagination from "@/components/paginations/pagination";
import AddFolderModal from "./records-modals/add-folder-modal";
import NoFolder from "./empty-states/no-folder";
import FolderToolbar from "./toolbars/folder-toolbar";
import { useFuseSearch } from "@/hooks/useFuseSearch";

const Folders = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDateFilter, setSelectedDateFilter] =
    React.useState<string>("all");

  const {
    data: allFoldersData,
    isLoading,
    refetch: refetchAllFolders,
  } = useGetAllFoldersQuery({});

  const cachedFoldersData = useMemo(() => allFoldersData, [allFoldersData]);

  const keys = ["filename", "type"]; // Adjust these keys based on your file structure
  const filteredFiles = useFuseSearch(
    cachedFoldersData,
    searchQuery,
    keys,
    selectedDateFilter
  );

  const dataLength = filteredFiles?.length || 0;
  const perPage = 5;

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-y-[16px]">
      <div className="flex md:flex-row flex-col items-center justify-between">
        <div className="w-full items-center flex justify-between">
          <h5 className="flex-1 md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
            Folders
          </h5>
          <Button
            text="Add"
            className="md:hidden block !py-[12px] !px-[40px]"
            buttonAttributes={{
              onClick: () => document.getElementById("add-folder")?.click(),
            }}
          />
        </div>
        <FolderToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}
        />
      </div>
      <div className="flex flex-col gap-y-[8px] min-h-[400px]">
        <div className="flex-1 flex flex-col gap-y-[8px]">
          {filteredFiles?.length > 0 ? (
            filteredFiles?.map((item: any, index: number) => (
              <FolderCard key={index} data={item} />
            ))
          ) : (
            <NoFolder />
          )}
        </div>
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalItems={dataLength}
            perPage={perPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <AddFolderModal refetchAllFolderFiles={refetchAllFolders} />
    </div>
  );
};

export default Folders;
