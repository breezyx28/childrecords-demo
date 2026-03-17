"use client";

import { TOEKN_KEY } from "@/config/config";
import { setCookie } from "cookies-next";
import React from "react";

export const useGoogleWindow = (onAuthSuccess?: (token: string) => void) => {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined" && url) {
      // Open the URL in a new tab
      const authTab = window.open(url, "_blank");

      // Interval to check if the tab is closed
      const tabCheckInterval = setInterval(() => {
        if (authTab && authTab.closed) {
          // Clear the interval
          clearInterval(tabCheckInterval);

          // Refresh the page and reset everything
          window.location.reload();
        }
      }, 500); // Check every 500ms

      // Listen for messages from the popup tab
      const handleMessage = (event: MessageEvent) => {
        // Ensure the message is from the expected origin
        if (event.origin !== window.origin) return;

        // Handle the token received from the popup
        if (event.data.token) {
          const token = event.data.token;

          // Store the token securely
          setCookie(TOEKN_KEY, token, {
            httpOnly: false,
            secure: true,
            sameSite: "strict",
          });

          // Pass the token back to the parent
          onAuthSuccess?.(token);

          // Clear the interval
          clearInterval(tabCheckInterval);

          // Close the popup tab
          authTab?.close();
        }
      };

      window.addEventListener("message", handleMessage);

      // Cleanup event listener and interval on component unmount
      return () => {
        window.removeEventListener("message", handleMessage);
        clearInterval(tabCheckInterval);
        if (authTab && !authTab.closed) authTab.close();
      };
    }
  }, [url, onAuthSuccess]);

  return {
    setUrl,
  };
};
