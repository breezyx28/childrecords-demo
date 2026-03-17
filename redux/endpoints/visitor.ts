import { createApi } from "@reduxjs/toolkit/query/react";

// Mock base query: no real API call (React SPA has no Next.js API route)
const mockBaseQuery = async () => {
  return { data: { success: true } };
};

export const partnerVisitorApi = createApi({
  reducerPath: "partnerVisitorApi",
  baseQuery: mockBaseQuery,
  endpoints: (builder) => ({
    postVisitorData: builder.mutation<any, any>({
      query: (data) => ({
        url: "/partner-visitor",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostVisitorDataMutation } = partnerVisitorApi;
