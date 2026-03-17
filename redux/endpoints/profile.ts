// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";
import { removeUserData, saveUserData } from "@/helper/user-data";
import { setUserInfo } from "../slices/userSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

/** Map profile API response (user, children, subscription) to flat shape used by app/slice */
function formatProfileInfo(payload: {
  user?: Record<string, unknown>;
  children?: unknown[];
  subscription?: Record<string, unknown>;
} | null | undefined): Record<string, unknown> | null {
  if (!payload?.user) return null;
  const user = payload.user as Record<string, unknown>;
  const children = Array.isArray(payload.children) ? payload.children : [];
  const sub = (payload.subscription as Record<string, unknown>) || {};
  const subscribed = sub.status === "active";
  return {
    id: user.id,
    fullname: user.name ?? user.fullname ?? "",
    email: user.email ?? "",
    nationality: user.nationality ?? "",
    photo: user.profile_photo ?? user.photo ?? null,
    children_num: children.length,
    subscribed,
    subscription_plan: sub.plan ?? null,
    subscription_ends_at: sub.expires_at ?? null,
    subscription_tier: sub.plan ?? null,
    trial_consumed: 0,
    // keep raw for consumers that need them
    user,
    children,
    subscription: sub,
  };
}

const handleAuthData = async (
  data: any,
  dispatch: ThunkDispatch<any, any, UnknownAction>
) => {
  if (data) {
    await saveUserData(data);
    dispatch(setUserInfo(data));
  } else {
    removeUserData();
  }
};

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["MyInfo"],
  endpoints: (builder) => ({
    getMyInfo: builder.query({
      query: () => ({
        url: "profile",
      }),
      providesTags: ["MyInfo"],
      keepUnusedDataFor: 86400,
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          await handleAuthData(data, dispatch);
        } catch (error) {
          await handleAuthData(null, dispatch);
          console.error("login-error:", error);
        }
      },
      transformResponse: (response: { data: any }, meta, arg) => {
        const raw = response?.data;
        const formatted = formatProfileInfo(raw);
        return formatted ?? raw;
      },
    }),
    basicInfo: builder.query({
      query: () => ({
        url: "profile/basic",
      }),
      keepUnusedDataFor: 86400, // Keep data for 24 hours (86400 seconds)
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    profilePhoto: builder.query({
      query: () => ({
        url: `profile/photo`,
      }),
      keepUnusedDataFor: 86400, // Keep data for 24 hours (86400 seconds)
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getHelpCenterInfo: builder.query({
      query: () => ({
        url: `user/profile/help`,
      }),
      keepUnusedDataFor: 86400, // Keep data for 24 hours (86400 seconds)
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    changePassword: builder.mutation({
      query(body) {
        return {
          url: "user/profile/password/change",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    changeBasicInfo: builder.mutation({
      query(body) {
        return {
          url: "profile/basic",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["MyInfo"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    changeProfilePhoto: builder.mutation({
      query(body) {
        return {
          url: "profile/photo/update",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMyInfoQuery,
  useBasicInfoQuery,
  useChangeBasicInfoMutation,
  useChangeProfilePhotoMutation,
  useProfilePhotoQuery,
  useChangePasswordMutation,
  useGetHelpCenterInfoQuery,
  usePrefetch,
} = profileApi;
