// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Statistics"],
  endpoints: (builder) => ({
    stats: builder.query({
      query: () => ({
        url: "user/statistics",
      }),
      providesTags: ["Statistics"],
      transformResponse: (response: { data: any }, meta, arg) => response?.data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useStatsQuery } = statisticsApi;
