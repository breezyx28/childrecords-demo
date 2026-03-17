"use client";

import { useEffect } from "react";

export const useAuthCallback = () => {
  useEffect(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Send the token back to the parent window
      window.opener.postMessage({ token }, window.origin);
      window.close(); // Close the popup
    }
  }, []);
};
