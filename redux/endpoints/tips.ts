// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const tipsApi = createApi({
  reducerPath: "tipsApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Tips"],
  endpoints: (builder) => ({
    tips: builder.query({
      query: () => ({
        url: "dashboard/tip",
      }),
      providesTags: ["Tips"],
      transformResponse: (response: { data: any }, meta, arg) => response?.data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useTipsQuery,
  util: { resetApiState: resetTipsApi, invalidateTags: invalidateTipsTags },
} = tipsApi;
