"use client";

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { deleteCookie, setCookie } from "cookies-next";
import { TOEKN_KEY } from "@/config/config";

const useGetUrlToken = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      deleteCookie(TOEKN_KEY);
      setCookie(TOEKN_KEY, token as string, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        path: "/", // Accessible site-wide
      });

      navigate("/dashboard");
    }
  }, [token, navigate]);
};

export default useGetUrlToken;
