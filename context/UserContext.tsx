// context/UserContext.tsx
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { TUserInfo } from "@/types/user";
import { useGetMyInfoQuery, profileApi } from "@/redux/endpoints/profile";
import { useSelector } from "react-redux";
import { getCurrentUser, isAuthenticated } from "@/redux/ApiConfig";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryActionCreatorResult,
} from "@reduxjs/toolkit/query";
import { QueryDefinition } from "@reduxjs/toolkit/query";

type UserContextType = {
  userInfo: TUserInfo | undefined; // User data
  isLoading: boolean; // Loading state
  isFetching: boolean; // Fetching state
  isError: boolean; // Error state
  setLoading: (...args: any) => any;
  loading: boolean;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      any,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      "MyInfo",
      any,
      "profileApi"
    >
  >; // Refetch function
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  // Use the `select` method to get the cached data
  const cachedData = useSelector(profileApi.endpoints.getMyInfo.select({}));

  // Use the `useGetMyInfoQuery` hook to fetch fresh data if needed
  const {
    data: myInfo,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMyInfoQuery(
    {},
    {
      skip: !isAuthenticated() || !!cachedData.data, // Skip the query if the user is not authenticated or if there is cached data
    }
  );

  // Determine the user info to use: cached data, fresh data, or locally stored data
  const userInfo = myInfo || cachedData.data || getCurrentUser();

  // Refetch data only if there is no cached data and the user is authenticated
  useEffect(() => {
    if (
      isAuthenticated() &&
      !cachedData.data
      // &&
      // pathname.startsWith("/dashboard")
    ) {
      refetch();
    }
  }, [cachedData.data, refetch]);

  // Provide the user info, loading state, error state, and refetch function
  const value = {
    userInfo,
    isLoading,
    isError,
    isFetching,
    loading,
    setLoading,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
