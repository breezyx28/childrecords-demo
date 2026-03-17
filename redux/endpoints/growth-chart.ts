import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

export const growthChartApi = createApi({
  reducerPath: "growthChartApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Logs"],
  endpoints: (builder) => ({
    getWeight: builder.query({
      query: () => ({
        url: "chart/weight",
      }),
      providesTags: ["Logs"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getHeight: builder.query({
      query: () => ({
        url: "chart/height",
      }),
      providesTags: ["Logs"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getLogs: builder.query({
      query: () => ({
        url: "chart/log",
      }),
      providesTags: ["Logs"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    logWeightAndHeight: builder.mutation({
      query(body) {
        return {
          url: "chart/log",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
      invalidatesTags: ["Logs"],
    }),
  }),
});

export const {
  useGetHeightQuery,
  useGetWeightQuery,
  useGetLogsQuery,
  useLogWeightAndHeightMutation,
  util: { resetApiState: resetLogsApi, invalidateTags: invalidateLogsTags },
} = growthChartApi;
