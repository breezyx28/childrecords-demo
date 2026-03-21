"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Share04 } from "untitledui-js";

type TFileShare = {
  url?: string;
  title: string;
  text: string;
  id: number;
};
export const FileShare = ({ text, title, url = "", id }: TFileShare) => {
  const fileUrlSharing = async () => {
    const fileUrl = url;

    const data = {
      title,
      text,
      url: fileUrl,
    };

    try {
      // Check if the Web Share API is available
      if (navigator.canShare && navigator.canShare(data)) {
        await navigator.share(data);
        console.log("File link shared successfully!");
      } else {
        console.log("Sharing is not supported in this browser.");
        toast.warning(
          "Sharing is not supported in this browser ... using ChildRecords share",
          {
            position: "bottom-left",
          }
        );
        document.getElementById(`share-file-${id}`)?.click();
      }
    } catch (error) {
      console.error("Error sharing file link:", error);
    }
  };

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={async () => fileUrlSharing()}
      >
        <Share04 className="!w-[20px] !h-[18px] mx-[3px]" /> Share
      </DropdownMenuItem>
    </>
  );
};
