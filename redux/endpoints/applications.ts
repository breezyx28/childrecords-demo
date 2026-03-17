// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  tagTypes: ["My-Docs", "Apps", "Active-Apps", "Expired-Apps", "Almost-Apps"],
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    myApplications: builder.query({
      query: () => ({
        url: "user/application",
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      providesTags: ["Apps"],
    }),
    applicationsDetails: builder.query({
      query: (id) => ({
        url: `user/application/${id}`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    applicationFilter: builder.mutation({
      query: (searchTerms) => ({
        url: `user/application/filter?${searchTerms}`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    checkUploadProcess: builder.mutation({
      query: ({ service_id, subservice_id }) => ({
        url: `application/check${
          service_id ? "?service_id=" + service_id : ""
        }${
          subservice_id && service_id ? "&subservice_id=" + subservice_id : ""
        }`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    applicationsStatusDetails: builder.query({
      query: (id) => ({
        url: `user/application/${id}/status`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    trackApplications: builder.query({
      query: () => ({
        url: "application/track",
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    activeApplications: builder.query({
      query: (args: any) => ({
        url: "application/active",
        params: { ...args },
      }),
      transformResponse: (response: { data: any }, meta, arg) => response,
      providesTags: ["Active-Apps"],
    }),
    almostApplications: builder.query({
      query: (args: any) => ({
        url: "application/almost",
        params: { ...args },
      }),
      transformResponse: (response: { data: any }, meta, arg) => response,
      providesTags: ["Almost-Apps"],
    }),
    expiredApplications: builder.query({
      query: (args: any) => ({
        url: "application/expired",
        params: { ...args },
      }),
      transformResponse: (response: { data: any }, meta, arg) => response,
      providesTags: ["Expired-Apps"],
    }),
    myDocuments: builder.query({
      query: (args: any) => ({
        url: "user/my_documents",
        params: { ...args },
      }),
      transformResponse: (response: { data: any }, meta, arg) => response,
      providesTags: ["My-Docs"],
    }),
    uploadDocument: builder.mutation({
      query(body) {
        return {
          url: "application/document/upload",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
      invalidatesTags: ["My-Docs"],
    }),
    replaceDocument: builder.mutation({
      query(body) {
        return {
          url: "application/document/replace",
          method: "PUT",
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
export const {
  useApplicationsDetailsQuery,
  useApplicationsStatusDetailsQuery,
  useMyApplicationsQuery,
  useReplaceDocumentMutation,
  useUploadDocumentMutation,
  useApplicationFilterMutation,
  useMyDocumentsQuery,
  useCheckUploadProcessMutation,
  useTrackApplicationsQuery,
  useActiveApplicationsQuery,
  useAlmostApplicationsQuery,
  useExpiredApplicationsQuery,
} = applicationsApi;
