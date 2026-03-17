// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Moments"],
  endpoints: (builder) => ({
    getAchievedMilestones: builder.query({
      query: () => ({
        url: "profile/milestone",
      }),
      providesTags: ["Moments"],
      transformResponse: (response: { data: any }, meta, arg) =>
        response.data?.data ?? response.data,
    }),
    getFavArticles: builder.query({
      query: () => ({
        url: "profile/favourite/article",
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getFavTips: builder.query({
      query: () => ({
        url: "profile/favourite/tip",
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    // ------------------ Delete -----------------
    updateProfileInfo: builder.mutation({
      query(body) {
        return {
          url: "profile/update",
          method: "POST",
          body,
        };
      },
    }),
    updateProfilePhoto: builder.mutation({
      query(body) {
        return {
          url: "profile/photo",
          method: "POST",
          body,
        };
      },
    }),
    updateChildInfo: builder.mutation({
      query(body) {
        return {
          url: "profile/child/update",
          method: "POST",
          body,
        };
      },
    }),
    // -------------- Delete -------------
    deleteMilestonePhoto: builder.mutation({
      query({ photo_id }) {
        return {
          url: `profile/photo/${photo_id}/delete`,
          method: "POST",
          body: { photo_id },
        };
      },
      invalidatesTags: ["Moments"],
    }),
    deleteChild: builder.mutation({
      query({ child_id }) {
        return {
          url: `profile/child/${child_id}/delete`,
          method: "POST",
          body: { child_id },
        };
      },
      // invalidatesTags: ["Moments"],
    }),
    // ---------- Reset -------------
    resetPassword: builder.mutation({
      query: ({ old_password, new_password }) => ({
        url: "profile/password/reset",
        method: "POST",
        body: { old_password, new_password },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDeleteChildMutation,
  useDeleteMilestonePhotoMutation,
  useGetAchievedMilestonesQuery,
  useGetFavArticlesQuery,
  useGetFavTipsQuery,
  useResetPasswordMutation,
  useUpdateChildInfoMutation,
  useUpdateProfileInfoMutation,
  useUpdateProfilePhotoMutation,
  util: {
    resetApiState: resetAccountApi,
    invalidateTags: invalidateAccountTags,
  },
} = accountApi;
