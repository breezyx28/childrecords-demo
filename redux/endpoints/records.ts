import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

export const recordsApi = createApi({
  reducerPath: "recordsApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Files", "Folders"],
  endpoints: (builder) => ({
    // -------------------------- Files ----------------------------
    getAllFiles: builder.query({
      query: () => ({
        url: "record/file/all",
      }),
      providesTags: ["Files"],
      transformResponse: (response: { data: any }, meta) => response.data,
    }),
    searchFile: builder.query({
      query: ({ term }: { term: string }) => ({
        url: `/record/file/search?term=${term}`,
      }),
      providesTags: ["Files"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    previewFile: builder.query({
      query: ({ file_id }: { file_id: number }) => ({
        url: `/record/file/${file_id}`,
      }),
      providesTags: ["Files"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),

    addFile: builder.mutation({
      query(body) {
        return {
          url: "record/file",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Files"],
      transformResponse: (response: { data: any }, meta) => response,
    }),
    moveFileToFolder: builder.mutation({
      query(body) {
        return {
          url: "record/file/move",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Files"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    editFile: builder.mutation({
      query(body) {
        return {
          url: "record/file/edit",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Files"],
      transformResponse: (
        response: { data: any; success: boolean },
        meta,
        arg
      ) => response,
    }),
    deleteFile: builder.mutation({
      query({ file_id }: { file_id: number }) {
        return {
          url: `record/file/${file_id}/delete`,
          method: "POST",
        };
      },
      invalidatesTags: ["Files"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    // ---------------------------- End Files -----------------------------------

    // ----------------------------- Folders -----------------------------------
    getAllFolders: builder.query({
      query: () => ({
        url: "record/folder/all",
      }),
      providesTags: ["Folders"],
      transformResponse: (response: { data: any }, meta) => response.data,
    }),
    getFolderDetails: builder.query({
      query: ({ folder_id }: { folder_id: string | number }) => ({
        url: `record/folder/${folder_id}`,
      }),
      providesTags: ["Folders"],
      transformResponse: (response: { data: any; prevs: any }, meta, arg) =>
        response,
    }),
    getFolderFiles: builder.query({
      query: ({ record_id }: { record_id: number }) => ({
        url: `record/folder/file?record_id=${record_id}`,
      }),
      providesTags: ["Folders"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    addFolder: builder.mutation({
      query(body) {
        return {
          url: "record/folder",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Folders"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    deleteFolder: builder.mutation({
      query({ folder_id }: { folder_id: number }) {
        return {
          url: `record/folder/${folder_id}/delete`,
          method: "POST",
        };
      },
      invalidatesTags: ["Folders"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
  }),
});

export const {
  useAddFileMutation,
  useAddFolderMutation,
  useDeleteFileMutation,
  useDeleteFolderMutation,
  useEditFileMutation,
  useGetAllFilesQuery,
  useGetAllFoldersQuery,
  useGetFolderDetailsQuery,
  useGetFolderFilesQuery,
  useMoveFileToFolderMutation,
  usePreviewFileQuery,
  useSearchFileQuery,
  util: {
    resetApiState: resetRecordsApi,
    invalidateTags: invalidateRecordsTags,
  },
} = recordsApi;
