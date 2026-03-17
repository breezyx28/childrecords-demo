// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getUserIdFromChat: builder.query({
      query: () => ({
        url: "chat/userId",
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    sendMessage: builder.mutation({
      query(body) {
        return {
          url: "chat/message",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    agentConnected: builder.mutation({
      query(body) {
        return {
          url: "chat/agent/status",
          method: "PATCH",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    userConnected: builder.mutation({
      query(body) {
        return {
          url: "chat/user/status",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    userIsTyping: builder.mutation({
      query(body) {
        return {
          url: "chat/typing",
          method: "PATCH",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    userEnterChat: builder.mutation({
      query() {
        return {
          url: "chat/enters",
          method: "PATCH",
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAgentConnectedMutation,
  useGetUserIdFromChatQuery,
  useSendMessageMutation,
  useUserIsTypingMutation,
  useUserEnterChatMutation,
  useUserConnectedMutation,
} = chatApi;
