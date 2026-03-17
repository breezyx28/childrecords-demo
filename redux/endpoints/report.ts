// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const monthlyReportApi = createApi({
  reducerPath: "monthlyReportApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Report"],
  endpoints: (builder) => ({
    getMonthlyReport: builder.query({
      query: (token: string) => ({
        url: `report?token=${token}`,
      }),
      providesTags: ["Report"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
  }),
});

export const { useGetMonthlyReportQuery } = monthlyReportApi;
