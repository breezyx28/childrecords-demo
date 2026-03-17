"use client";

import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useGoogleAuthMutation } from "@/redux/endpoints/login";
import { useGoogleWindow } from "@/hooks/useGoogleWindow";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { TOEKN_KEY } from "@/config/config";
import { toast } from "sonner";
import { removeUserData, saveUserData } from "@/helper/user-data";

type ButtonProps = {
  text?: string | React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
};

const GoogleButton = ({ text, className, type = "button" }: ButtonProps) => {
  // const [googleAuth, { data, isLoading, error }] = useGoogleAuthMutation();

  // MOCK BRANCH: Bypass Google authentication - redirect directly to dashboard
  const handleGoogleLogin = () => {
    // Set mock token
    setCookie(TOEKN_KEY, "mock_jwt_token_12345_demo_user", {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    });

    // Set mock user data
    const mockUserData = {
      id: 1,
      fullname: "Ahmed Zakaria",
      name: "Ahmed Zakaria",
      email: "demo@childrecord.com",
      nationality: "Egypt",
      phone: "+20 123 456 7890",
      photo: "https://i.pravatar.cc/150?u=demo",
      gender: "male",
      children_num: 3,
      subscribed: true,
      subscription_plan: "premium",
      subscription_tier: "monthly",
      subscription_ends_at: "2025-12-31",
      trial_consumed: 0,
      created_at: "2024-01-15T10:30:00Z",
    };

    saveUserData(mockUserData);
    window.location.href = "/dashboard";
  };

  /* ORIGINAL GOOGLE AUTH LOGIC (COMMENTED FOR MOCK BRANCH)
  const { setUrl } = useGoogleWindow(async (token) => {
    setCookie(TOEKN_KEY, token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    });

    if (getCookie(TOEKN_KEY)) {
      fetchProfile(token)
        .then((data) => {
          removeUserData();
          if (data?.data) {
            saveUserData(data?.data);

            if (
              data?.data.trial_consumed === 1 &&
              data?.data.subscription_plan === "trial"
            ) {
              // toast.error("Your free trial has been consumed, please upgrade");
              document.getElementById("upgrade-dialog")?.click();
              return;
            }

            window.location.href = "/dashboard";
          } else {
            removeUserData();
          }
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  });

  useEffect(() => {
    if (error) {
      console.error("Google Auth Error:", error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setUrl(data?.data); // Set the Google Auth URL to open the pop-up
    }
  }, [data, setUrl]);
  */

  return (
    <button
      // disabled={isLoading}
      onClick={handleGoogleLogin}
      type={type}
      className={twMerge(
        "w-full p-[14px] border border-[#DBE0E8] rounded-full transition-all duration-300 ease-in-out dely-100 flex items-center justify-center gap-2",
        className
        // isLoading && "grayscale bg-disabled"
      )}
    >
      <img
        src={"/assets/pages/login/Google.svg"}
        width={20}
        height={20}
        alt="google-icon"
        className="w-[20px] h-[20px]"
      />
      <span
        className={twMerge(
          "text-black text-[14px] font-semibold transition-all duration-300 ease-in-out dely-200"
        )}
      >
        {text ?? "Continue with Google"}
      </span>
    </button>
  );
};

const fetchProfile = async (token: string): Promise<any> => {
  try {
    const response = await fetch("https://api.childrecords.care/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    console.log("profile-data: ", data);

    // Return the parsed data
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export default GoogleButton;
