import axios from "axios";

export const useDownloadImage = () => {
  const downloadImage = async (url: string, fileName: string) => {
    try {
      const response = await axios({
        url: url,
        method: "GET",
        responseType: "blob",
      });

      if (response.status === 200) {
        const blob = new Blob([response.data]);
        const blobUrl = window.URL.createObjectURL(blob);

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
          // iOS devices: Open the file in a new tab for manual download
          const newTab = window.open(blobUrl, "_blank");
          if (!newTab) {
            alert("Please allow popups to download the file.");
          }
        } else if (navigator.userAgent.match(/Android/i)) {
          // Android devices: Open the file in a new tab for manual download
          const newTab = window.open(blobUrl, "_blank");
          if (!newTab) {
            alert("Please allow popups to download the file.");
          }
        } else {
          // Desktop and other devices
          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        // Revoke the blob URL to free up memory
        window.URL.revokeObjectURL(blobUrl);
      } else {
        console.error("Error: Received non-200 status code");
      }
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return downloadImage;
};
