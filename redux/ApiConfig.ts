"use client";

import { _mockedUserInfo } from "@/config/_mock/user-info";
import { TOEKN_KEY } from "@/config/config";
import { getUserData } from "@/helper/user-data";
import { getCookie } from "cookies-next";

// Retrieve the token from cookies (client-side)
export const getToken = () => getCookie(TOEKN_KEY) ?? null;

// Check if the user is authenticated
export const isAuthenticated = () => Boolean(getToken()); // If the token exists, user is authenticated

// Prepare headers for API requests
export const prepareHeaders = (headers: any) => {
  headers.set("accept", "application/json");

  const token = getToken();
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};

// Dynamically fetch the current user data
export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const userData = getUserData();
    return typeof userData === "string"
      ? JSON.parse(userData)
      : _mockedUserInfo;
  } catch (error) {
    Error("Error fetching user data");
    return _mockedUserInfo;
  }
};

// Check if the user is subscribed
export const isSubscribed = () =>
  Boolean(getCurrentUser()?.subscribed || false);

// Profile Photo Handling (if the user photo is stored in cookies)
const imageBaseURL = import.meta.env.NEXT_PUBLIC_API_IMAGES;
// export const PhotoPath = (path: string) => `${imageBaseURL}${path}`;
export const PhotoPath = (path: string) => `${path}`;
