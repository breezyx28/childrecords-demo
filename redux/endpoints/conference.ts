// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const conferenceApi = createApi({
  reducerPath: "conferenceApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    conferences: builder.query({
      query: () => ({
        url: "conference",
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    myAppointments: builder.query({
      query: () => ({
        url: `user/appointment`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    conferenceFilter: builder.mutation({
      query: (searchTerms) => ({
        url: `user/appointment/filter?${searchTerms}`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getAppointment: builder.query({
      query: (appointment_id) => ({
        url: `user/appointment/${appointment_id}`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    conferenceFees: builder.query({
      query: (id) => ({
        url: `conference/${id}/fees`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    conferenceAvailableDatesInMonth: builder.mutation({
      query: (month) => ({
        url: `conference/available/${month}`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    conferenceAvailableTimings: builder.mutation({
      query: (date: Date) => ({
        url: `conference/available/${date}/times`,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    conferenceOfficeInfo: builder.query({
      query: () => ({
        url: `conference/office`,
      }),
      transformResponse: (response: { data: any; meta: any }, meta, arg) =>
        response,
    }),
    conferenceBookingAppointment: builder.mutation({
      query(body) {
        return {
          url: "conference/appointment",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    conferenceRescheduleAppointment: builder.mutation({
      query(body) {
        return {
          url: "conference/appointment/reschedule",
          method: "PATCH",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    joinConference: builder.mutation({
      query({ id }) {
        return {
          url: `conference/appointment/${id}/join`,
          method: "POST",
          // body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useConferenceBookingAppointmentMutation,
  useConferenceAvailableDatesInMonthMutation,
  useConferenceAvailableTimingsMutation,
  useConferenceFeesQuery,
  useConferenceFilterMutation,
  useConferenceOfficeInfoQuery,
  useConferenceRescheduleAppointmentMutation,
  useConferencesQuery,
  useMyAppointmentsQuery,
  useJoinConferenceMutation,
  useGetAppointmentQuery,
} = conferenceApi;
