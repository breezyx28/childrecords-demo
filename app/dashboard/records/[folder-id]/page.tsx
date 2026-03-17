"use client";

import Button from "@/components/buttons/button";
import FileCard from "@/components/cards/records/file-card";
import { SelectMenu } from "@/components/inputs/select-menu";
import Pagination from "@/components/paginations/pagination";
import {
  useGetFolderDetailsQuery,
  useGetFolderFilesQuery,
} from "@/redux/endpoints/records";
import { SearchIcon } from "lucide-react";
import React, { useMemo } from "react";
import Loading from "@/app/loading";
import { useParams } from "react-router-dom";
import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import AddFileModal from "../records-modals/add-file-modal";
import AddFolderModal from "../records-modals/add-folder-modal";
import FolderCard from "@/components/cards/records/folder-card";
import NoFileFolder from "../empty-states/no-file-folder";
import Toolbar from "./toolbar";
import { useFuseSearch } from "@/hooks/useFuseSearch";

const Files = () => {
  const { folderId: FolderId } = useParams();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDateFilter, setSelectedDateFilter] =
    React.useState<string>("all");

  const {
    data: allFolderFilesData,
    isLoading,
    refetch: refetchAllFolderFiles,
  } = useGetFolderFilesQuery({
    record_id: +FolderId,
  });
  const { data: currentFolderDetails, isLoading: currentFolderLoading } =
    useGetFolderDetailsQuery({
      folder_id: +FolderId,
    });

  const cachedFolderFilesData = useMemo(
    () => allFolderFilesData,
    [allFolderFilesData]
  );

  const keys = ["filename", "type"]; // Adjust these keys based on your file structure
  const filteredFiles = useFuseSearch(
    cachedFolderFilesData,
    searchQuery,
    keys,
    selectedDateFilter
  );

  const dataLength = cachedFolderFilesData?.length || 0;
  const perPage = 5;

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );

  const currentDir = () => {
    if (currentFolderDetails?.data?.directory === "/") {
      return "/" + currentFolderDetails?.data?.filename;
    }
    return (
      currentFolderDetails?.data?.directory +
      "/" +
      currentFolderDetails?.data?.filename
    );
  };

  console.log(currentDir());

  return (
    <PagesLayout
      pages={
        currentFolderDetails?.prevs
          ? [
              { href: "/dashboard", title: "Dashboard" },
              { href: "/dashboard/records", title: "Records" },
              ...currentFolderDetails?.prevs?.map((item: any) => ({
                href: `/dashboard/records/${item?.id}`,
                title: item?.name,
              })),
              {
                href: `/dashboard/records/${currentFolderDetails?.data?.id}`,
                title: `${currentFolderDetails?.data?.filename}`,
              },
            ]
          : [
              { href: "/dashboard", title: "Dashboard" },
              { href: "/dashboard/records", title: "Records" },
            ]
      }
    >
      <div className="w-full flex flex-col gap-y-[16px]">
        <div className="flex md:flex-row flex-col items-center justify-between">
          <div className="w-full items-center flex justify-between">
            <h5 className="flex-1 md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
              {currentFolderDetails && currentFolderDetails?.data?.filename}
            </h5>
            <Button
              text="Add File"
              className="md:hidden block md:py-[12px] md:px-[40px] !px-[20px] text-center"
              buttonAttributes={{
                onClick: () => document.getElementById("add-file")?.click(),
              }}
            />
            <Button
              text="Add Folder"
              className="md:hidden block md:py-[12px] md:px-[40px] !px-[20px] text-center"
              buttonAttributes={{
                onClick: () => document.getElementById("add-folder")?.click(),
              }}
            />
          </div>
          <Toolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDateFilter={selectedDateFilter}
            setSelectedDateFilter={setSelectedDateFilter}
          />
        </div>
        <div className="flex flex-col gap-y-[8px] min-h-[400px]">
          <div className="flex-1 flex flex-col gap-y-[8px]">
            {filteredFiles?.length > 0 ? (
              filteredFiles?.map((item: any, index: number) => {
                if (item?.type === "file") {
                  return <FileCard key={index} data={item} />;
                }
                if (item?.type === "folder") {
                  return <FolderCard key={index} data={item} />;
                }
              })
            ) : (
              <NoFileFolder />
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
        <AddFileModal
          refetchAllFolderFiles={refetchAllFolderFiles}
          currentDir={currentDir()}
        />
        <AddFolderModal
          refetchAllFolderFiles={refetchAllFolderFiles}
          currentDir={currentDir()}
        />
      </div>
    </PagesLayout>
  );
};

export default Files;
