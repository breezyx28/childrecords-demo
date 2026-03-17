import { getCurrentUser } from "@/redux/ApiConfig";
import { useGetMyInfoQuery } from "@/redux/endpoints/profile";
import { useMemo } from "react";

export const useMyInfo = () => {
  const { data, isLoading, isError } = useGetMyInfoQuery({});

  const myInfo = useMemo(() => {
    if (isLoading || isError) {
      return getCurrentUser();
    } else {
      return data;
    }
  }, [data, isLoading, isError]);
  return myInfo;
};
