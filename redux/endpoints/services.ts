// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../baseQuery";

// Define a service using a base URL and expected endpoints
export const servicesApi = createApi({
  reducerPath: "servicesApi",
  tagTypes: [
    "Categories",
    "SubCategories",
    "Services",
    "SubServices",
    "Booked",
  ],
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => ({
        url: "category",
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["Categories"],
    }),
    subCategories: builder.query({
      query: (category_id) => ({
        url: "category/" + category_id,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["SubCategories"],
    }),
    subCategoryService: builder.query({
      query: (subcategory_id) => ({
        url: `subcategory/${subcategory_id}`,
        params: {
          without_pagination: true,
        },
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["Services"],
    }),
    service: builder.query({
      query: (service_id) => ({
        url: `service/${service_id}`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    getSubservice: builder.query({
      query: ({ service_id, subservice_id }) => ({
        url: `service/${service_id}/subservices/${subservice_id}`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    getSubservices: builder.query({
      query: (service_id) => ({
        url: `service/${service_id}/subservices`,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["SubServices"],
    }),
    serviceFees: builder.query({
      query: (id) => ({
        url: `service/${id}/fees`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    serviceFeesDeposit: builder.query({
      query: (id) => ({
        url: `service/${id}/fees/deposit`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    searchForService: builder.query({
      query: (searchTerm) => ({
        url: `service/search/${searchTerm}`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    serviceSearchHistory: builder.query({
      query: () => ({
        url: `service/search_history`,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    getBookedServices: builder.query({
      query: () => ({
        url: `service/bookmark`,
      }),
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ["Booked"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCategoriesQuery,
  useSubCategoryServiceQuery,
  useSearchForServiceQuery,
  useGetSubservicesQuery,
  useGetSubserviceQuery,
  useServiceFeesDepositQuery,
  useServiceFeesQuery,
  useServiceQuery,
  useServiceSearchHistoryQuery,
  useSubCategoriesQuery,
  useGetBookedServicesQuery,
} = servicesApi;
