// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query(body) {
        return {
          url: "contact",
          method: "POST",
          body,
        };
      },
      transformResponse: (
        response: { data: any; success: boolean },
        meta,
        arg
      ) => response,
      invalidatesTags: ["Contacts"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSubmitContactMutation } = contactUsApi;
