// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: apiBaseQuery,
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    unreadedNotifications: builder.query({
      query: () => ({
        url: "notification",
      }),
      providesTags: ["Notification"],
      transformResponse: (response: { data: any }, meta, arg) => response?.data,
    }),
    markNotificationAsReaded: builder.mutation({
      query({ notification_id }) {
        return {
          url: `notification/${notification_id}/read`,
          method: "POST",
        };
      },
      invalidatesTags: ["Notification"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
  }),
});

export const {
  useMarkNotificationAsReadedMutation,
  useUnreadedNotificationsQuery,
} = notificationsApi;
