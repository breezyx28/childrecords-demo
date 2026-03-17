"use client";

import Button from "@/components/buttons/button";
import FileCard from "@/components/cards/records/file-card";
import Pagination from "@/components/paginations/pagination";
import { useGetAllFilesQuery } from "@/redux/endpoints/records";
import React, { useMemo } from "react";
import Loading from "@/app/loading";
import NoFile from "./empty-states/no-file";
import AddFileModal from "./records-modals/add-file-modal";
import FileToolbar from "./toolbars/file-toolbar";
import { useFuseSearch } from "@/hooks/useFuseSearch";

const Files = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDateFilter, setSelectedDateFilter] =
    React.useState<string>("all");

  const {
    data: allFilesData,
    isLoading,
    refetch: refetchAllFiles,
  } = useGetAllFilesQuery(undefined);

  const cachedFilesData = useMemo(() => allFilesData, [allFilesData]);

  const keys = ["filename", "title", "type", "description"];
  const fileList = Array.isArray(cachedFilesData) ? cachedFilesData : [];
  const filteredFiles = useFuseSearch(
    fileList,
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
            Files
          </h5>
          <Button
            text="Add"
            className="md:hidden block !py-[12px] !px-[40px]"
            buttonAttributes={{
              onClick: () => document.getElementById("add-file")?.click(),
            }}
          />
        </div>
        <FileToolbar
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
              <FileCard key={index} data={item} />
            ))
          ) : (
            <NoFile />
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
      <AddFileModal refetchAllFolderFiles={refetchAllFiles} />
    </div>
  );
};

export default Files;
