"use client";

import { useGetMyInfoQuery } from "@/redux/endpoints/profile";

const useRefreshGoogleUser = () => {
  const { refetch } = useGetMyInfoQuery(undefined);

  refetch()
    .then((res: any) => {
      console.log("google-auth-user-refetch-res: ", res.json());
      window.location.href = "/dashboard";
    })
    .catch((error) => {
      console.log("google-refresh-user-error: ", error);
    });
};

export default useRefreshGoogleUser;
