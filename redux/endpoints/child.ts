// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const childApi = createApi({
  reducerPath: "childApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Child"],
  endpoints: (builder) => ({
    addChild: builder.mutation({
      query(body) {
        return {
          url: "child",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Child"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    editChild: builder.mutation({
      query(body) {
        return {
          url: "profile/child/update",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Child"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    getCurrentchild: builder.query({
      query: () => ({
        url: "child",
      }),
      providesTags: ["Child"],
      transformResponse: (response: { data: any }) =>
        response.data?.data ?? response.data,
    }),
    childInfo: builder.query({
      query: ({ id }) => ({
        url: `child/${id}`,
      }),
      providesTags: ["Child"],
      transformResponse: (response: { data: any }) =>
        response.data?.data ?? response.data,
    }),
    getParentChildren: builder.query({
      query: () => ({
        url: `child/all`,
      }),
      providesTags: ["Child"],
      transformResponse: (response: { data: any }) =>
        response.data?.data ?? response.data ?? [],
    }),
    switchChildren: builder.mutation({
      query({ child_id }) {
        return {
          url: `child/switch/${child_id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Child"],
      transformResponse: (response, meta, arg) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCurrentchildQuery,
  useAddChildMutation,
  useChildInfoQuery,
  useGetParentChildrenQuery,
  useSwitchChildrenMutation,
  useEditChildMutation,
  util: { resetApiState: resetChildApi, invalidateTags: invalidateChildTags },
} = childApi;
