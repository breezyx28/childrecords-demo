import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

export const reminderApi = createApi({
  reducerPath: "reminderApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Reminders"],
  endpoints: (builder) => ({
    getAllReminders: builder.query({
      query: () => ({
        url: "dashboard/reminder",
      }),
      providesTags: ["Reminders"],

      transformResponse: (response: { data: any }, meta) => response.data,
    }),

    searchReminder: builder.query({
      query: ({ term }: { term: string }) => ({
        url: `dashboard/reminder/search?term=${term}`,
      }),
      providesTags: ["Reminders"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),

    addReminder: builder.mutation({
      query(body) {
        return {
          url: "dashboard/reminder",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Reminders"],
      transformResponse: (response: { data: any }, meta) => response,
    }),

    updateReminder: builder.mutation({
      query(body) {
        return {
          url: "dashboard/reminder/update",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Reminders"],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    deleteReminder: builder.mutation({
      query({ reminder_id }: { reminder_id: number }) {
        return {
          url: `dashboard/reminder/${reminder_id}/delete`,
          method: "POST",
        };
      },
      invalidatesTags: ["Reminders"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
  }),
});

export const {
  useAddReminderMutation,
  useDeleteReminderMutation,
  useGetAllRemindersQuery,
  useSearchReminderQuery,
  useUpdateReminderMutation,
} = reminderApi;
