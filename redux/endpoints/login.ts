import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { TOEKN_KEY } from "@/config/config";
import { removeUserData, saveUserData } from "@/helper/user-data";

// Function to handle secure storage of authentication data
const handleAuthData = async (data: any) => {
  if (data?.token) {
    // Set cookies with a far-future expiration date (e.g., 10 years)
    const farFutureDate = new Date();
    farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

    setCookie(TOEKN_KEY, data?.token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      expires: farFutureDate, // Expiration set to 10 years from now
    });

    if (data?.data) {
      let response = await saveUserData(data?.data);

      if (response) {
        return true;
      }
      return false;
    }
    return true;
  } else {
    deleteCookie(TOEKN_KEY);

    removeUserData();

    return true;
  }
};

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          let response = await handleAuthData(data); // Store token and user data

          if (response) {
            let requestedUrl = getCookie("redirect-url");
            if (requestedUrl === "/#plans") {
              window.location.href = "/dashboard/profile/subscription";
              deleteCookie("redirect-url");
              return;
            }
            if (
              data?.data.trial_consumed === 1 &&
              data?.data.subscription_plan === "trial"
            ) {
              return;
            }
            if (requestedUrl) {
              window.location.href = requestedUrl;
              deleteCookie("redirect-url");
              return;
            }
            window.location.href = "/dashboard";
          }
        } catch (error) {
          await handleAuthData(null); // Clear tokens on error
          console.error("login-error:", error);
        }
      },
    }),
    googleAuth: builder.mutation({
      query: () => ({
        url: "auth/google",
        method: "Get",
      }),
      transformResponse: (response: { data: any; meta: any }, meta, arg) =>
        response,
    }),

    registerUser: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, password, password_confirmation }) => ({
        url: "auth/password/reset",
        method: "POST",
        body: { email, password, password_confirmation },
      }),
    }),
    forgetPassword: builder.mutation({
      query: ({ email }) => ({
        url: "auth/password/forgot",
        method: "POST",
        body: { email },
      }),
    }),
    verifyResetPasswordOTP: builder.mutation({
      query: ({ code, email }) => ({
        url: "auth/password/verify",
        method: "POST",
        body: { code, email },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.success) {
            handleAuthData(null); // Clear tokens on logout
            window.location.href = "/";
          }
        } catch (error) {
          handleAuthData(null); // Clear tokens on error
          console.error("logout-error:", error);
          window.location.href = "/login";
        }
      },
    }),
  }),
});

// Export hooks for each mutation
export const {
  useLoginUserMutation,
  useGoogleAuthMutation,
  useLogoutUserMutation,
  useForgetPasswordMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
  useVerifyResetPasswordOTPMutation,
} = loginApi;
