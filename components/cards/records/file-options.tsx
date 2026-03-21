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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Copy02, DotsVertical, Mail01 } from "untitledui-js";
import { FileShare } from "./file-shre";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Whatsapp } from "iconsax-react";
import Loading from "@/app/loading";
import { useDispatch } from "react-redux";

/** Absolute URL for clipboard / share / fetch (mock `files.json` uses site-relative `file_url`). */
function toAbsoluteFileUrl(raw: string): string {
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (typeof window === "undefined") return raw;
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${window.location.origin}${path}`;
}

type PreviewMode = "pdf" | "image" | "other";

function getPreviewMode(urlForHints: string, fileTypeHint?: string): PreviewMode {
  const hint = (fileTypeHint ?? "").toLowerCase();
  if (hint === "pdf" || hint === "application/pdf") return "pdf";
  if (
    hint === "image" ||
    hint.startsWith("image/") ||
    hint === "jpg" ||
    hint === "jpeg" ||
    hint === "png" ||
    hint === "gif" ||
    hint === "webp"
  ) {
    return "image";
  }
  const path = urlForHints.split("?")[0].toLowerCase();
  if (path.endsWith(".pdf")) return "pdf";
  if (/\.(jpe?g|png|gif|webp|svg|bmp|ico)$/i.test(path)) return "image";
  return "other";
}

function ensureDownloadFilename(displayName: string, rawUrl?: string): string {
  const name = (displayName ?? "").trim() || "download";
  if (/\.[a-z0-9]{2,8}$/i.test(name)) return name;
  const ext = rawUrl?.split("?")[0].match(/(\.[a-z0-9]{2,8})$/i)?.[1];
  return ext ? `${name}${ext}` : name;
}

/**
 * Only mount when the user opens View — avoids loading every file on page load.
 *
 * PDF: `iframe src` must NOT be the raw `.pdf` URL — browsers often trigger a file download.
 * We fetch once and use a blob: URL in the iframe for inline viewing only.
 * Use the **Download** menu item for an intentional save (downloadFromCloud).
 *
 * Images: `<img src={absoluteUrl} />` (does not trigger save dialog like PDF navigation).
 */
function FilePreviewCanvas({
  absoluteUrl,
  fileTypeHint,
}: {
  absoluteUrl: string;
  fileTypeHint?: string;
}) {
  const [imgBroken, setImgBroken] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfFetchFailed, setPdfFetchFailed] = useState(false);
  const pdfBlobRef = useRef<string | null>(null);

  const mode = getPreviewMode(absoluteUrl, fileTypeHint);

  useEffect(() => {
    setImgBroken(false);
  }, [absoluteUrl]);

  useEffect(() => {
    if (mode !== "pdf" || !absoluteUrl) {
      if (pdfBlobRef.current) {
        URL.revokeObjectURL(pdfBlobRef.current);
        pdfBlobRef.current = null;
      }
      setPdfBlobUrl(null);
      setPdfLoading(false);
      setPdfFetchFailed(false);
      return;
    }

    let cancelled = false;
    setPdfLoading(true);
    setPdfFetchFailed(false);
    if (pdfBlobRef.current) {
      URL.revokeObjectURL(pdfBlobRef.current);
      pdfBlobRef.current = null;
    }
    setPdfBlobUrl(null);

    fetch(absoluteUrl, { credentials: "same-origin" })
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        pdfBlobRef.current = url;
        setPdfBlobUrl(url);
      })
      .catch(() => {
        if (!cancelled) setPdfFetchFailed(true);
      })
      .finally(() => {
        if (!cancelled) setPdfLoading(false);
      });

    return () => {
      cancelled = true;
      if (pdfBlobRef.current) {
        URL.revokeObjectURL(pdfBlobRef.current);
        pdfBlobRef.current = null;
      }
      setPdfBlobUrl(null);
    };
  }, [mode, absoluteUrl]);

  if (!absoluteUrl) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6 text-center text-gray-500">
        No file URL available for preview.
      </div>
    );
  }

  if (mode === "image") {
    if (imgBroken) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-gray-500">
            Unable to preview this image. Open it in a new tab instead.
          </p>
          <a
            href={absoluteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline"
          >
            Open file
          </a>
        </div>
      );
    }
    return (
      <div className="flex max-h-[70vh] min-h-[400px] w-full max-w-full items-center justify-center overflow-auto bg-white p-2">
        <img
          src={absoluteUrl}
          alt=""
          className="max-h-[65vh] max-w-full object-contain"
          onError={() => setImgBroken(true)}
        />
      </div>
    );
  }

  if (mode === "pdf") {
    if (pdfLoading || (!pdfBlobUrl && !pdfFetchFailed)) {
      return (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loading />
        </div>
      );
    }
    if (pdfFetchFailed) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-gray-500">
            Could not load this PDF for preview. Open it in a new tab, or use
            &quot;Download&quot; in the menu to save the file.
          </p>
          <a
            href={absoluteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Open in new tab
          </a>
        </div>
      );
    }
    return (
      <div className="flex w-full max-w-full flex-col gap-2 overflow-hidden rounded-lg bg-white">
        <iframe
          src={pdfBlobUrl ?? undefined}
          title="PDF preview"
          className="h-[400px] w-full max-w-full border-0"
        />
        <p className="px-1 text-center text-[11px] text-gray-400">
          Inline preview only — use <span className="font-semibold">Download</span> in the
          menu to save the file.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-6">
      <p className="text-center text-gray-500">
        Inline preview isn&apos;t available for this file type.
      </p>
      <a
        href={absoluteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
      >
        Open in new tab
      </a>
    </div>
  );
}

type FileOptionsMenuProps = {
  id?: number;
  fileData?: {
    filename: TRecordsFile["filename"];
    description: TRecordsFile["description"];
    created_at: TRecordsFile["created_at"];
    /** From mock `files.json` — drives view / copy / download / share without preview-by-id */
    file_url?: string;
    file_type?: string;
  };
};

export function FileOptions({ id, fileData }: FileOptionsMenuProps) {
  const editModalId = `edit-file-${id}`;
  const viewModalId = `view-file-${id}`;
  const deleteModalId = `delete-file-${id}`;

  const dispatch = useDispatch();

  const hasMockListFileUrl = Boolean(fileData?.file_url);

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
      skip: !id || hasMockListFileUrl,
      refetchOnMountOrArgChange: false,
      pollingInterval: 50000,
    }
  );

  const apiPreviewRawUrl = useMemo(() => {
    if (reviewFileData == null || typeof reviewFileData !== "object")
      return undefined;
    const d = reviewFileData as Record<string, unknown>;
    const u = d.url ?? d.file_url;
    return typeof u === "string" ? u : undefined;
  }, [reviewFileData]);

  const apiFileTypeHint = useMemo(() => {
    if (reviewFileData == null || typeof reviewFileData !== "object")
      return undefined;
    const ft = (reviewFileData as Record<string, unknown>).file_type;
    return typeof ft === "string" ? ft : undefined;
  }, [reviewFileData]);

  const effectiveFileUrl = useMemo(() => {
    const raw = fileData?.file_url ?? apiPreviewRawUrl;

    if (!raw) return "";
    return toAbsoluteFileUrl(raw);
  }, [fileData?.file_url, apiPreviewRawUrl]);

  const previewTypeHint = fileData?.file_type ?? apiFileTypeHint;

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
      await navigator.clipboard.writeText(effectiveFileUrl);
      toast.info("File link copied to clipboard!", {
        position: "bottom-right",
      });
    } catch (error) {
      // toast.error("Failed to copy file link");
      // console.error("Failed to copy file link:", error);
    }
  };

  const handleDownloadClick = () => {
    const raw = fileData?.file_url ?? apiPreviewRawUrl;
    if (!raw) return;
    const baseName =
      fileData?.filename != null && String(fileData.filename).trim() !== ""
        ? String(fileData.filename)
        : "download";
    const name = ensureDownloadFilename(baseName, raw);
    downloadFromCloud(toAbsoluteFileUrl(raw), name);
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
            disabled={
              !effectiveFileUrl ||
              (privewIsLoading && !hasMockListFileUrl)
            }
            onClick={handleViewModalOpen}
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
            url={effectiveFileUrl}
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
        isOpen={isViewModalOpen}
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
          <div className="flex min-h-[400px] w-full max-w-full flex-grow justify-center rounded-lg border bg-gray-100">
            <div className="h-full w-full max-w-full overflow-auto rounded-lg border bg-gray-100 p-1">
              {reviewError && !hasMockListFileUrl ? (
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                  <p className="text-center text-gray-500">
                    Unable to preview this file. The file may be corrupted or in
                    an unsupported format.
                  </p>
                </div>
              ) : privewIsLoading && !hasMockListFileUrl ? (
                <div className="flex min-h-[400px] items-center justify-center">
                  <Loading />
                </div>
              ) : isViewModalOpen && effectiveFileUrl ? (
                <FilePreviewCanvas
                  absoluteUrl={effectiveFileUrl}
                  fileTypeHint={previewTypeHint}
                />
              ) : (
                <div className="flex min-h-[200px] w-full items-center justify-center px-4 text-center text-sm text-gray-400">
                  Open this dialog with &quot;View&quot; to load the file. Files are not
                  fetched until then.
                </div>
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
            <QRCodeSVG value={effectiveFileUrl || "https://childrecords.care"} size={128} />
          </div>
          {/* Social Links */}
          <div className="space-y-2">
            <p>Share via:</p>
            <div className="flex space-x-4">
              <a
                href={`https://wa.me/?text=childrecords.com: ${encodeURIComponent(
                  effectiveFileUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-3 py-3 rounded-full"
                title="via whatsapp"
              >
                <Whatsapp className="text-white w-[18px] h-[18px]" />
              </a>
              <a
                href={`mailto:?subject=Shared File from Childrecords.com!&body=${fileData?.filename}: ${effectiveFileUrl}`}
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
          <button
            type="button"
            className="text-blue-700 underline"
            onClick={handleDownloadClick}
          >
            Download File
          </button>
        </div>
      </Dialog>
    </DropdownMenu>
  );
}
