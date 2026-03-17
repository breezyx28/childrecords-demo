/**
 * Central API configuration.
 * - USE_MOCK_API: when true, all RTK Query calls use mock data from public/mock-api.
 * - API_URL: base URL for the real API when USE_MOCK_API is false.
 */
export const API_URL =
  (import.meta.env.NEXT_PUBLIC_API_URL as string) ||
  "https://api.childrecords.care/api";

export const USE_MOCK_API =
  import.meta.env.NEXT_PUBLIC_USE_MOCK_API !== "false";

export default API_URL;
