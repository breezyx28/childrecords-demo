// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const documentsApi = createApi({
  reducerPath: "documentsApi",
  tagTypes: ["My-Docs"],
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    uploadDocument: builder.mutation({
      query(body) {
        return {
          url: "user/my_documents",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
      invalidatesTags: ["My-Docs"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUploadDocumentMutation } = documentsApi;
