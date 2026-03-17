"use client";

import React from "react";
import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import {
  useGetAllFoldersQuery,
  useMoveFileToFolderMutation,
} from "@/redux/endpoints/records";
import Pagination from "@/components/paginations/pagination";
import Loading from "../../../loading";
import Button from "@/components/buttons/button";
import { twMerge } from "tailwind-merge";
import OutlineButton from "@/components/buttons/OutlineButton";
import SelecFolder from "../folder";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const SelectFolders = () => {
  const { fileId: FileId } = useParams();

  const [selectedFolder, setSelectFolder] = React.useState<null | number>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    data: allFoldersData,
    isLoading,
    isFetching,
    refetch: refetchAllFolders,
  } = useGetAllFoldersQuery({
    page: currentPage,
  });
  const [moveFile, { data: moveFileData, isLoading: movingFile, error }] =
    useMoveFileToFolderMutation();

  React.useEffect(() => {
    if (moveFileData) {
      // toast.success("File has been moved");

      setTimeout(() => {
        window.location.href = "/dashboard/records";
      }, 3000);
    }
  }, [moveFileData]);

  return (
    <PagesLayout>
      <div className="w-full">
        <div className="w-full flex flex-col gap-y-[16px]">
          <div className="flex items-center justify-between">
            <h5 className="flex-1 text-[24px] font-[800] leading-[32.74px]">
              Select Folder
            </h5>
          </div>
          <div className="flex flex-col gap-y-[8px] min-h-[400px]">
            <div className="flex-1 flex flex-col gap-y-[8px]">
              {!isFetching || !isLoading ? (
                allFoldersData?.map((item: any, index: number) => (
                  <SelecFolder
                    key={index}
                    data={item}
                    setSelect={setSelectFolder}
                  />
                ))
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <Loading />
                </div>
              )}
            </div>

            <div
              className={twMerge(
                "relative w-full flex flex-col gap-y-1 justify-center items-center transition-all delay-20"
              )}
            >
              {selectedFolder && (
                <Button
                  text={movingFile ? "..." : "Move File"}
                  isLoading={movingFile}
                  className={twMerge("fixed w-auto")}
                  buttonAttributes={{
                    onClick() {
                      moveFile({
                        record_id: FileId,
                        folder_id: selectedFolder,
                      });
                    },
                  }}
                />
              )}
              <OutlineButton
                disabled={movingFile}
                text="Cancel"
                className={twMerge("bg-white fixed w-auto mt-[120px]")}
                options={{
                  onClick() {
                    window.location.href = "/dashboard/records";
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PagesLayout>
  );
};

export default SelectFolders;
