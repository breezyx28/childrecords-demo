"use client";

import { useGetMyInfoQuery } from "@/redux/endpoints/profile";
import { useCallback, useEffect } from "react";

function useHydrateUser() {
  const { refetch } = useGetMyInfoQuery(undefined);

  const hydrateUser = useCallback(async () => {
    await refetch();
    console.log("User data has been hydrated.");
  }, [refetch]);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]); // Ensures it runs only once on mount

  return null; // If no UI logic is required, you don't need to return anything
}

export default useHydrateUser;
