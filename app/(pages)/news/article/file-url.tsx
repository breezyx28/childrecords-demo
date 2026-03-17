"use client";

import { ArrowUp } from "@/components/icons";
import { toast } from "sonner";

type TUrlShare = {
  url: string;
  title: string;
  text: string;
};
export const UrlShare = ({ text, title, url }: TUrlShare) => {
  const UrlSharing = async () => {
    const fileUrl = url; // Replace with your file URL

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
        document.getElementById("share-url")?.click();
      }
    } catch (error) {
      console.error("Error sharing file link:", error);
    }
  };

  return (
    <>
      <div
        className="px-[24px] flex gap-x-[8px] cursor-pointer"
        onClick={UrlSharing}
      >
        <ArrowUp /> <span className="">Share</span>
      </div>
    </>
  );
};
