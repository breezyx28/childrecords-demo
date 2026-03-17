"use client";

import { RecordsEditFileValidation } from "@/app/dashboard/records/edit-file-validation";
import Alert from "@/components/alerts";
import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import { Delete, Download, MoveToFolder, Pen, View } from "@/components/icons";
import Input from "@/components/inputs/input";
import Dialog from "@/components/modals/dialog";
import ValidationError from "@/components/states/errors/validationError";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  invalidateRecordsTags,
  useDeleteFileMutation,
  useEditFileMutation,
  useGetAllFilesQuery,
  usePreviewFileQuery,
} from "@/redux/endpoints/records";
import { TRecordsFile } from "@/types/records";
import React, { useEffect, useMemo, useState } from "react";
import { Copy02, DotsVertical, Mail01 } from "untitledui-js";
import { FileShare } from "./file-shre";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Whatsapp } from "iconsax-react";
import Loading from "@/app/loading";
import { useDispatch } from "react-redux";

type FileOptionsMenuProps = {
  id?: number;
  fileData?: {
    filename: TRecordsFile["filename"];
    description: TRecordsFile["description"];
    created_at: TRecordsFile["created_at"];
  };
};

export function FileOptions({ id, fileData }: FileOptionsMenuProps) {
  const editModalId = `edit-file-${id}`;
  const viewModalId = `view-file-${id}`;
  const deleteModalId = `delete-file-${id}`;

  const dispatch = useDispatch();

  const { refetch } = useGetAllFilesQuery({});
  const [
    deleteFile,
    { data: deleteFileData, isLoading: deletingFileIsLoading },
  ] = useDeleteFileMutation();

  const [
    editFile,
    { data: editedFileData, isLoading: editingData, error: editError },
  ] = useEditFileMutation();

  const {
    data: reviewFileData,
    isLoading: privewIsLoading,
    error: reviewError,
  } = usePreviewFileQuery(
    { file_id: id as any },
    {
      refetchOnMountOrArgChange: false,
      pollingInterval: 50000,
    }
  );

  const reviewFile = useMemo(() => {
    return reviewFileData;
  }, [reviewFileData]);

  const { controller, displayError } = new RecordsEditFileValidation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = controller();

  useEffect(() => {
    if (editError) {
      displayError(editError);
    }
  }, [editError]);

  useEffect(() => {
    if (editedFileData?.success) {
      dispatch(invalidateRecordsTags(["Files"]));
      const timeout = setTimeout(() => {
        refetch();
      }, 3000);
      reset();
      document.getElementById(editModalId)?.click();

      return () => clearTimeout(timeout);
    }
  }, [editedFileData]);

  const onSubmit = async (values: any) =>
    editFile({ ...values, record_id: id });

  async function downloadFromCloud(fileUrl: string, fileName: string) {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); // Clean up memory
    } catch (error) {
      // toast.error("Error downloading file");
      // console.error("Error downloading file:", error);
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reviewFile?.url ?? "");
      toast.info("File link copied to clipboard!", {
        position: "bottom-right",
      });
    } catch (error) {
      // toast.error("Failed to copy file link");
      // console.error("Failed to copy file link:", error);
    }
  };

  const handleDownloadClick = () => {
    if (reviewFile?.url && fileData?.filename) {
      downloadFromCloud(reviewFile.url, fileData.filename);
    }
  };

  const handleEmbedError = () => {
    // toast.error("Unable to preview this file. Please try a different file.");
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewModalOpen = () => {
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none">
        <DotsVertical
          size="16"
          className="text-black cursor-pointer focus:outline-none focus:ring-0 focus:border-none"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[160px]">
        <DropdownMenuGroup className="cursor-pointer">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => document.getElementById(editModalId)?.click()}
          >
            <Pen className="!w-[26px] !h-[24px]" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={privewIsLoading}
            onClick={() => {
              handleViewModalOpen();
              document.getElementById(viewModalId)?.click();
            }}
          >
            <View className="!w-[26px] !h-[24px]" /> View
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleDownloadClick}
          >
            <Download className="!w-[26px] !h-[24px]" /> Download
          </DropdownMenuItem>

          <FileShare
            id={id as any}
            text={fileData?.filename ?? "Child Records file"}
            title={fileData?.filename + "- Child Records"}
            url={reviewFile?.url}
          />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              (window.location.href = `/dashboard/records/select-folder/${id}`)
            }
          >
            <MoveToFolder className="!w-[26px] !h-[24px]" /> Move to folder
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => document.getElementById(deleteModalId)?.click()}
          >
            <Delete className="!w-[26px] !h-[24px]" /> Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      <Dialog closeBtn id={deleteModalId}>
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[12px] text-center">
            <h1 className="text-black text-[24px] font-[800] leading-[32.74px]">
              Delete file
            </h1>
            <p className="text-[#585A5D] text-[16px] font-[700] leading-[19.84px]">
              Are you you want to delete this file?
            </p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <Button
              isLoading={deletingFileIsLoading}
              text="Delete"
              buttonAttributes={{
                onClick() {
                  deleteFile({ file_id: id as any }).then((response) => {
                    document.getElementById(deleteModalId)?.click();
                  });
                },
              }}
            />
            <OutlineButton
              text="Cancel"
              className="w-full"
              options={{
                onClick: () => document.getElementById(deleteModalId)?.click(),
              }}
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        closeBtn
        id={viewModalId}
        modalClass="md:max-w-[600px] !max-w-auto"
        onClose={handleViewModalClose}
      >
        <div className="flex flex-col gap-y-[16px]">
          <div className="text-center ">
            <p className="text-black text-[24px] font-[800] leading-[32.74px]">
              {fileData && fileData?.filename}
            </p>
            <p className="text-[#83868B] text-[12px] font-[500] leading-[15.6px]">
              Added on {fileData && fileData?.created_at}
            </p>
          </div>
          <div className="flex-grow min-h-[400px] flex justify-center items-center border rounded-lg bg-gray-100">
            <div className="overflow-auto flex justify-center items-center border rounded-lg bg-gray-100 w-full h-full">
              {reviewError ? (
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <p className="text-gray-500 text-center">
                    Unable to preview this file. The file may be corrupted or in
                    an unsupported format.
                  </p>
                </div>
              ) : privewIsLoading ? (
                <Loading />
              ) : (
                <embed
                  src={isViewModalOpen ? reviewFile?.url || "#" : ""}
                  title="File Preview"
                  className="!block !border-none w-full h-full"
                  style={{ width: "100vw", height: "400px" }} // Additional inline styles for complete coverage
                  onError={handleEmbedError}
                ></embed>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-[4px]">
            <p className="text-black text-[14px] font-[700] leading-[18.2px]">
              Description
            </p>
            <p className="text-black text-[14px] font-[500] leading-[18.2px]">
              {fileData?.description}
            </p>
          </div>
        </div>
      </Dialog>

      <Dialog closeBtn id={editModalId}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* @ts-ignore */}
          {editError && (
            <Alert
              type="error"
              message={
                // @ts-ignore
                editError?.message
              }
              error={editError}
            />
          )}
          <div className="w-full flex flex-col gap-y-[32px]">
            <div className="flex flex-col gap-y-[24px]">
              <h5 className="text-center text-black text-[24px] font-[800] leading-[32.74px]">
                Edit file
              </h5>
              <div className="flex flex-col gap-y-[12px]">
                <Input
                  option={{
                    type: "text",
                    placeholder: "File name",
                    error: errors.filename?.message,
                    defaultValue: fileData?.filename ?? "",
                  }}
                  inputProps={{
                    ...register("filename"),
                  }}
                />
                <div className="flex flex-col">
                  <textarea
                    {...register("description")}
                    defaultValue={fileData?.description ?? ""}
                    rows={6}
                    placeholder="Description"
                    className="border px-[12px] py-[18px] rounded-[16px] px-[12px] text-[#83868B] text-[16px] font-[500] leading-[19.84px]"
                  />
                  {/* @ts-ignore */}
                  {errors?.description?.message && (
                    // @ts-ignore
                    <ValidationError text={errors?.description?.message} />
                  )}
                </div>
              </div>
            </div>
            <Button text="Update" type="submit" isLoading={editingData} />
          </div>
        </form>
      </Dialog>

      <Dialog
        closeBtn
        id={`share-file-${id}`}
        forceDisplay
        modalClass="!min-w-[300px]"
      >
        <div className="flex flex-col items-center space-y-6 p-4">
          <h1 className="text-lg font-bold">Share This File</h1>
          {/* QR Code */}
          <div className="space-y-2">
            <p>Scan this QR code:</p>
            <QRCodeSVG value={reviewFile?.url} size={128} />
          </div>
          {/* Social Links */}
          <div className="space-y-2">
            <p>Share via:</p>
            <div className="flex space-x-4">
              <a
                href={`https://wa.me/?text=childrecords.com: ${encodeURIComponent(
                  reviewFile?.url
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-3 py-3 rounded-full"
                title="via whatsapp"
              >
                <Whatsapp className="text-white w-[18px] h-[18px]" />
              </a>
              <a
                href={`mailto:?subject=Shared File from Childrecords.com!&body=${fileData?.filename}: ${reviewFile?.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-500 text-white px-3 py-3 rounded-full"
                title="mail"
              >
                <Mail01 className={"text-white w-[18px] h-[18px]"} />
              </a>
            </div>
          </div>
          {/* Copy to Clipboard */}
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-3 py-3 rounded-full"
          >
            <Copy02 className="text-white w-[18px] h-[18px]" />
          </button>
          {/* Direct Download */}
          <a
            href={"#"}
            download
            className="text-blue-700 underline"
            onClick={handleDownloadClick}
          >
            Download File
          </a>
        </div>
      </Dialog>
    </DropdownMenu>
  );
}
