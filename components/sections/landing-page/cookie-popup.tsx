// components/CookiePopup.js
"use client";
import Button from "@/components/buttons/button";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const CookiePopup = () => {
  // Check if the user has already accepted cookies using localStorage
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    if (typeof window !== "undefined") {
      setIsVisible(!localStorage.getItem("cookieConsent"));
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "true");
      setIsVisible(false);
    }
  };

  const handleReject = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "false");
      setIsVisible(false);
    }
  };

  return (
    <div
      className={twMerge(
        "fixed left-0 right-0 bg-gray-800 text-white bg-opacity-90 backdrop-blur-md p-4 z-50 transition-all delay-1000 duration-300 ease-out",
        isVisible ? "bottom-0" : "bottom-[-320px] delay-0"
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
          <img 
            src="/assets/logos/logo-icon.svg"
            alt="Website Logo"
            width={50}
            height={50}
            className="mx-auto md:mr-4"
          />
          <p className="text-white text-sm md:text-base font-medium mt-2 md:mt-0">
            We use cookies to improve your experience. By using our site, you
            agree to our{" "}
            <a href="/privacy-policy" className="underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms-conditions" className="underline">
              Terms & Conditions
            </a>
            .
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button
            text="Accept"
            className="btn btn-primary ml-0 md:ml-4"
            buttonAttributes={{
              onClick: handleAccept,
            }}
          />
          <Button
            text="Reject"
            className="btn btn-secondary ml-4"
            buttonAttributes={{
              onClick: handleReject,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
