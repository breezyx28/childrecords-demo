// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const newsletterApi = createApi({
  reducerPath: "newsletterApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation({
      query({ email }) {
        return {
          url: "letter/subscribe",
          method: "POST",
          body: { email },
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSubscribeToNewsletterMutation } = newsletterApi;
