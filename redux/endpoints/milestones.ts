// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const milestonesApi = createApi({
  reducerPath: "milestonesApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Milestones"],
  endpoints: (builder) => ({
    milestoneCtegories: builder.query({
      query: () => ({
        url: "milestone/category",
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    milestoneDailyActivities: builder.query({
      query: () => ({
        url: "dashboard/activity",
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    milestoneCtegory: builder.query({
      query: ({ category_id }) => ({
        url: `milestone/category/${category_id}`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getMilestones: builder.query({
      query: ({ category_id }) => ({
        url: `milestone/category/${category_id}/milestone`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) =>
        response.data?.data ?? response.data,
    }),
    getMilestone: builder.query({
      query: ({ milestone_id }) => ({
        url: `milestone/${milestone_id}`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getMilestoneActivities: builder.query({
      query: ({ milestone_id }) => ({
        url: `milestone/${milestone_id}/activity`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getActivity: builder.query({
      query: ({ activity_id }) => ({
        url: `milestone/activity/${activity_id}`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (
        response: { data: any; relatedMilestones: [] | any },
        meta,
        arg
      ) => response,
    }),
    getArticle: builder.query({
      query: ({ article_id }) => ({
        url: `milestone/article/${article_id}`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (
        response: { data: any; relatedMilestones: [] | any },
        meta,
        arg
      ) => response,
    }),
    rateActivity: builder.mutation({
      query(body) {
        return {
          url: "milestone/activity/rate",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    markActivityCompleted: builder.mutation({
      query({ activity_id, completed }) {
        return {
          url: `dashboard/activity/${activity_id}/complete/${completed}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    getMilestoneArticles: builder.query({
      query: ({ milestone_id }) => ({
        url: `milestone/${milestone_id}/article`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getMilestoneArticle: builder.query({
      query: ({ article_id }) => ({
        url: `milestone/article/${article_id}`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getActivityProducts: builder.query({
      query: ({ activity_id }) => ({
        url: `milestone/${activity_id}/product`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getMilestoneCategoryTips: builder.query({
      query: ({ category_id }) => ({
        url: `milestone/category/${category_id}/tips`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getMilestoneTips: builder.query({
      query: ({ milestone_id }) => ({
        url: `milestone/${milestone_id}/tip`,
      }),
      providesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    markMilestoneCompleted: builder.mutation({
      query({
        milestone_id,
        completed,
      }: {
        milestone_id: number | string;
        completed: boolean;
      }) {
        return {
          url: `milestone/${milestone_id}/completed/${completed}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    uploadMomentPhotos: builder.mutation({
      query(body) {
        return {
          url: "milestone/photo",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    addFavourite: builder.mutation({
      query({ type, id }: { type: "tip" | "article"; id: number | string }) {
        return {
          url: "milestone/favourite",
          method: "POST",
          body: {
            type,
            id,
          },
        };
      },
      // invalidatesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    incrementVideoViews: builder.mutation({
      query({ activity_id }: { activity_id: number | string }) {
        return {
          url: `milestone/activity/${activity_id}/views`,
          method: "POST",
        };
      },
      // invalidatesTags: ["Milestones"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useMarkActivityCompletedMutation,
  useMilestoneDailyActivitiesQuery,
  useGetActivityQuery,
  useGetArticleQuery,
  useIncrementVideoViewsMutation,
  useGetMilestoneActivitiesQuery,
  useGetMilestoneArticleQuery,
  useGetMilestoneArticlesQuery,
  useGetMilestoneCategoryTipsQuery,
  useGetActivityProductsQuery,
  useGetMilestoneQuery,
  useGetMilestoneTipsQuery,
  useGetMilestonesQuery,
  useMarkMilestoneCompletedMutation,
  useMilestoneCtegoriesQuery,
  useMilestoneCtegoryQuery,
  useUploadMomentPhotosMutation,
  useAddFavouriteMutation,
  useRateActivityMutation,
  util: {
    resetApiState: resetMilestonesApi,
    invalidateTags: invalidateMilestonesTags,
  },
} = milestonesApi;
