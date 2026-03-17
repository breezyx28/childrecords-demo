"use client";

import Loading from "@/app/loading";
import { ArrowUp, BabyCrawl, Heart } from "@/components/icons";
import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import { PhotoPath } from "@/redux/ApiConfig";
import { useGetArticleQuery } from "@/redux/endpoints/milestones";

import { useSearchParams } from "react-router-dom";
import React from "react";
import DOMPurify from "dompurify";
import { toast } from "sonner"; // For showing notifications
import Dialog from "@/components/modals/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Whatsapp } from "iconsax-react";
import { Copy02, Mail01 } from "untitledui-js";
import { UrlShare } from "./file-url";
import isAuth from "@/helper/isAuth";
import { twMerge } from "tailwind-merge";

const Article = () => {
  const [searchParams] = useSearchParams();
  const [htmlContent, setHtmlContent] = React.useState("");
  const [readingTime, setReadingTime] = React.useState("0 min read"); // Default reading time

  const id = searchParams?.get("id");

  const { data, isLoading } = useGetArticleQuery(
    { article_id: id },
    {
      skip: !id,
    }
  );

  React.useEffect(() => {
    if (data?.data?.body) {
      const sanitizedHtml = DOMPurify.sanitize(data?.data?.body);
      setHtmlContent(sanitizedHtml);

      // Calculate reading time
      const wordCount = countWords(sanitizedHtml);
      const timeInMinutes = calculateReadingTime(wordCount);
      setReadingTime(`${timeInMinutes} min read`);
    }
  }, [data?.data]);

  // Function to count words in HTML content
  const countWords = (html: string): number => {
    const text = html.replace(/<[^>]+>/g, ""); // Remove HTML tags
    const words = text.split(/\s+/).filter((word) => word.length > 0); // Split into words
    return words.length;
  };

  // Function to calculate reading time
  const calculateReadingTime = (wordCount: number): number => {
    const wordsPerMinute = 200; // Average reading speed
    return Math.ceil(wordCount / wordsPerMinute); // Round up to the nearest minute
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PagesLayout>
      <div className="w-full">
        <div className="wrapper flex flex-col gap-y-[24px]">
          <div className="article-cover max-h-[400px] h-[400px] w-full">
            <img 
              src={PhotoPath(data?.data?.photo)}
              width={1000}
              height={1000}
              alt="article-cover"
              className="w-full rounded-[24px] max-h-[400px] h-full object-cover"
            />
          </div>
          <div className="article-titles flex md:flex-row flex-col gap-y-[12px] justify-between">
            <div className="flex flex-col gap-y-[4px]">
              <h5 className="text-black md:text-[28px] text-[18px] font-[800] md:leading-[38.19px] leading-[24.55px] capitalize">
                {data?.data?.name ?? "----"}
              </h5>
              <div className="flex items-center text-[#83868B]">
                <div className="flex items-center gap-[5px]">
                  {data?.data?.category?.icon ? (
                    <img 
                      src={PhotoPath(data?.data?.category?.icon)}
                      alt="category-icon"
                    />
                  ) : (
                    <BabyCrawl className="text-primary-600" />
                  )}
                  <span className="text-[14px] font-[700] leading-[18.2px]">
                    {data?.data?.category?.name ?? "Child Development"}
                  </span>
                </div>
                <div className="text-[14px] font-[700] leading-[18.2px] flex items-center">
                  <span className="mx-[8px] rounded-full w-[4px] h-[4px] bg-[#83868B]"></span>
                  <span className="">{data?.data?.views} views</span>
                  <span className="mx-[8px] rounded-full w-[4px] h-[4px] bg-[#83868B]"></span>
                  <span className="">{data?.data?.reading_time}</span>{" "}
                  {/* Dynamic reading time */}
                </div>
              </div>
            </div>
            <div className="flex justify-between py-[13px] text-[#585A5D] text-[14px] font-[700] leading-[18.2px]">
              <div className="px-[24px] flex gap-x-[8px]">
                <Heart
                  fill={data?.data?.favorite ? "currentColor" : "none"}
                  className={twMerge(
                    data?.data?.favorite ? "text-error-600" : ""
                  )}
                />{" "}
                <span className="">Favorite</span>
              </div>
              <div className="h-[20px] w-[1px] bg-[#DBE0E8]"></div>
              <UrlShare
                url={window.location.href}
                title={data?.data?.name ?? "Article"}
                text="Article"
              />
            </div>
          </div>
          <div className="article-details">
            <div
              className="!font-lexend"
              dangerouslySetInnerHTML={{ __html: htmlContent }} // Render the HTML
            />
          </div>
        </div>
        <Dialog
          closeBtn
          id={`article-file`}
          forceDisplay
          modalClass="!min-w-[300px]"
        >
          <div className="flex flex-col items-center space-y-6 p-4">
            <h1 className="text-lg font-bold">Share This Article</h1>
            {/* QR Code */}
            <div className="space-y-2">
              <p>Scan this QR code:</p>
              <QRCodeSVG value={window.location.href} size={128} />
            </div>
            {/* Social Links */}
            <div className="space-y-2">
              <p>Share via:</p>
              <div className="flex space-x-4">
                <a
                  href={`https://wa.me/?text=childrecords.com: ${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-3 py-3 rounded-full"
                  title="via whatsapp"
                >
                  <Whatsapp className="text-white w-[18px] h-[18px]" />
                </a>
                <a
                  href={`mailto:?subject=Shared Article from Childrecords.com!&body=${data?.data?.name}: ${window.location.href}`}
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
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
                // toast.success("URL copied to clipboard!");
              }}
              className="bg-blue-500 text-white px-3 py-3 rounded-full"
            >
              <Copy02 className="text-white w-[18px] h-[18px]" />
            </button>
          </div>
        </Dialog>
      </div>
    </PagesLayout>
  );
};

export default isAuth(Article);
