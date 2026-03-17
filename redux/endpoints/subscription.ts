// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";
import { TSubscriptionTier, TUpgradePlan } from "@/types/subscription";

// Define a service using a base URL and expected endpoints
export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  tagTypes: ["Subscription"],
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: () => ({
        url: "subscribe/paymentmethod",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    getPaymentMethod: builder.query({
      query: ({ payment_method_id }) => ({
        url: `subscribe/paymentmethod/${payment_method_id}`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    setPaymentMethodDefault: builder.query({
      query: ({ payment_method_id }) => ({
        url: `subscribe/paymentmethod/${payment_method_id}/default`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    deletePaymentMethod: builder.query({
      query: ({ payment_method_id }) => ({
        url: `subscribe/paymentmethod/${payment_method_id}/delete`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    setupIntent: builder.query({
      query: () => ({
        url: "subscribe/intent",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    subscriptionHistory: builder.query({
      query: () => ({
        url: "subscribe/history",
      }),
      transformResponse: (response: { data?: { data?: any }; data?: any }) =>
        response.data?.data ?? response.data,
    }),
    createPaymentMethod: builder.mutation({
      query({ payment_method_id }) {
        return {
          url: "subscribe/paymentmethod",
          method: "POST",
          body: { payment_method_id },
        };
      },
      invalidatesTags: ["Subscription"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    trialSubscription: builder.mutation({
      query({ tier }: { tier: TSubscriptionTier["tier"] }) {
        return {
          url: "subscribe/trial",
          method: "POST",
          body: { tier },
        };
      },
      invalidatesTags: ["Subscription"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    basicSubscription: builder.mutation({
      query({ tier }: { tier: TSubscriptionTier["tier"] }) {
        return {
          url: "subscribe/basic",
          method: "POST",
          body: { tier },
        };
      },
      invalidatesTags: ["Subscription"],
      transformResponse: (response: { data: any }, meta, arg) => response,
    }),
    premiumSubscription: builder.mutation({
      query({ tier }: { tier: TSubscriptionTier["tier"] }) {
        return {
          url: "subscribe/premium",
          method: "POST",
          body: { tier },
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
      invalidatesTags: ["Subscription"],
    }),
    cancelSubscription: builder.mutation({
      query(body) {
        return {
          url: "subscribe/cancel",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
      invalidatesTags: ["Subscription"],
    }),
    upgradePlan: builder.mutation({
      query({
        tier,
        plan,
      }: {
        tier: TUpgradePlan["tier"];
        plan: TUpgradePlan["plan"];
      }) {
        return {
          url: "subscribe/upgrade",
          method: "POST",
          body: {
            tier,
            plan,
          },
        };
      },
      transformResponse: (response: { data: any }, meta, arg) => response,
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useBasicSubscriptionMutation,
  useCancelSubscriptionMutation,
  useCreatePaymentMethodMutation,
  useSubscriptionHistoryQuery,
  useDeletePaymentMethodQuery,
  useGetPaymentMethodQuery,
  useGetPaymentMethodsQuery,
  usePremiumSubscriptionMutation,
  useSetPaymentMethodDefaultQuery,
  useSetupIntentQuery,
  useTrialSubscriptionMutation,
  useUpgradePlanMutation,
} = subscriptionApi;
