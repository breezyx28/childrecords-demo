"use client";

import React from "react";
import DownloadingReport from "./loading";
import { useSearchParams } from "react-router-dom";
import { setCookie } from "cookies-next";
import { useGetMonthlyReportQuery } from "@/redux/endpoints/report";

const Report = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams?.get("token");

  const { data, isError, isLoading, error } = useGetMonthlyReportQuery(
    token as any,
    {
      skip: !token,
    }
  );

  React.useEffect(() => {
    let currentUrl = window.location.href;
    setCookie("redirect-url", currentUrl);

    if (data?.url) {
      downloadFile(data?.url); // Call the download function when the URL is available
    }
  }, [searchParams, data]);

  // Function to download the file directly using the URL
  const downloadFile = (url: string) => {
    try {
      // Extract the filename from the URL
      const urlObject = new URL(url); // Create a URL object
      const pathname = urlObject.pathname; // Get the pathname (e.g., "/storage/reports/monthly-medical-report-8-January%202025.pdf")
      const filenameFromUrl = pathname.split("/").pop(); // Get the last part of the pathname (e.g., "monthly-medical-report-8-January%202025.pdf")
      const decodedFilename = decodeURIComponent(
        filenameFromUrl || "report.pdf"
      ); // Decode URI-encoded characters and provide a default name

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      link.href = url; // Use the direct URL from the Redux Toolkit Query response
      link.download = decodedFilename; // Set the filename for the download
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center px-[20px] md:px-[100px]">
      {isLoading && <DownloadingReport />}
      {isError && (
        <div className="text-lg mx-2">
          <span className="font-bold">Error fetching report:</span>{" "}
          {/* @ts-ignore */}
          <span className="">{error?.data?.message}</span>
        </div>
      )}
    </div>
  );
};

export default Report;
