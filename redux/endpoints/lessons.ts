import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

export const lessonsApi = createApi({
  reducerPath: "lessonsApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Lessons"],
  endpoints: (builder) => ({
    getlessons: builder.query({
      query: () => ({
        url: "dashboard/lesson",
      }),
      providesTags: ["Lessons"],
      transformResponse: (response: { data: any }, meta, arg) => response?.data,
    }),
  }),
});

export const {
  useGetlessonsQuery,
  util: {
    resetApiState: resetLessonsApi,
    invalidateTags: invalidateLessonsTags,
  },
} = lessonsApi;
