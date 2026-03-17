"use client";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_URL, USE_MOCK_API } from "./config";

// Mock data URL mapping (used when USE_MOCK_API is true)
// More specific patterns first (longer paths) so prefix matching works correctly
const MOCK_DATA_MAP: Record<string, string> = {
  // Auth
  "auth/login": "/mock-api/auth/login.json",
  "auth/register": "/mock-api/auth/register.json",
  "auth/logout": "/mock-api/auth/logout.json",
  "auth/password/forgot": "/mock-api/auth/forgot.json",
  "auth/password/verify": "/mock-api/auth/verify-otp.json",
  "auth/password/reset": "/mock-api/auth/reset.json",
  "auth/google": "/mock-api/auth/login.json",

  // Profile (order: more specific first)
  "profile": "/mock-api/profile/info.json",
  "profile/basic": "/mock-api/profile/info.json",
  "profile/milestone": "/mock-api/profile/milestones.json",
  "profile/favourite/article": "/mock-api/profile/fav-articles.json",
  "profile/favourite/tip": "/mock-api/profile/fav-tips.json",
  "profile/update": "/mock-api/success.json",
  "profile/photo": "/mock-api/success.json",
  "profile/password/reset": "/mock-api/success.json",
  "profile/child/update": "/mock-api/child/update.json",
  "user/profile/help": "/mock-api/user/profile/help.json",
  "user/profile/password/change": "/mock-api/success.json",
  "profile/photo/update": "/mock-api/success.json",

  // Child (child/all before child so /child/1 matches child)
  "child/all": "/mock-api/child/all.json",
  "child": "/mock-api/child/current.json",
  "child/switch": "/mock-api/child/switch.json",

  // Records (specific first)
  "record/file/all": "/mock-api/records/files.json",
  "record/file/search": "/mock-api/records/files.json",
  "record/file": "/mock-api/records/file-detail.json",
  "record/folder/all": "/mock-api/records/folders.json",
  "record/folder/file": "/mock-api/records/files.json",
  "record/folder": "/mock-api/records/folder-detail.json",

  // Milestones (specific first: category milestones before category list)
  "milestone/category/": "/mock-api/milestones/category-milestones.json",
  "milestone/category": "/mock-api/milestones/categories.json",
  "milestone": "/mock-api/milestone/category-detail.json",
  "dashboard/activity": "/mock-api/milestones/activities.json",

  // Dashboard
  "dashboard/reminder": "/mock-api/reminders/all.json",
  "dashboard/reminder/search": "/mock-api/reminders/all.json",
  "dashboard/tip": "/mock-api/dashboard/tip.json",
  "dashboard/lesson": "/mock-api/dashboard/lesson.json",

  // Notifications
  "notification": "/mock-api/notifications/unread.json",

  // Subscription
  "subscription/plans": "/mock-api/subscription/plans.json",
  "subscribe/paymentmethod": "/mock-api/subscribe/paymentmethod.json",
  "subscribe/intent": "/mock-api/subscribe/intent.json",
  "subscribe/history": "/mock-api/subscribe/history.json",
  "subscribe": "/mock-api/success.json",

  // Growth Chart / Chart
  "growth-chart/measurements": "/mock-api/growth-chart/measurements.json",
  "chart/weight": "/mock-api/chart/weight.json",
  "chart/height": "/mock-api/chart/height.json",
  "chart/log": "/mock-api/chart/log.json",

  // Tips
  "tips": "/mock-api/tips/all.json",

  // Report
  "report": "/mock-api/report.json",

  // User / Services / Applications / Conference / Chat / Documents / Contact / Newsletter / Statistics
  "user/statistics": "/mock-api/user/statistics.json",
  "user/application": "/mock-api/user/application.json",
  "user/my_documents": "/mock-api/user/my_documents.json",
  "user/appointment": "/mock-api/user/appointment.json",
  "category": "/mock-api/category.json",
  "subcategory": "/mock-api/category.json",
  "service": "/mock-api/category.json",
  "conference": "/mock-api/conference.json",
  "chat": "/mock-api/chat/userId.json",
  "letter/subscribe": "/mock-api/success.json",
  "application": "/mock-api/user/application.json",
};

// Custom mock base query
const mockBaseQuery = async (args: any) => {
  const url = typeof args === "string" ? args : args.url;
  const method = typeof args === "string" ? "GET" : args.method || "GET";

  // Find matching mock data file
  let mockFile = null;

  // Direct match
  if (MOCK_DATA_MAP[url]) {
    mockFile = MOCK_DATA_MAP[url];
  } else {
    // Pattern matching for dynamic routes (e.g., child/1, milestone/category/2)
    for (const [pattern, file] of Object.entries(MOCK_DATA_MAP)) {
      // Check if URL starts with pattern
      if (url.startsWith(pattern)) {
        mockFile = file;
        break;
      }
    }
  }

  // For POST/PUT/DELETE mutations, return generic success
  if (method !== "GET" && !mockFile) {
    mockFile = "/mock-api/success.json";
  }

  // If still no match, return generic success
  if (!mockFile) {
    mockFile = "/mock-api/success.json";
  }

  try {
    const response = await fetch(mockFile);
    const data = await response.json();

    return { data };
  } catch (error) {
    console.error(`Mock API Error for ${url}:`, error);
    return {
      error: {
        status: 404,
        data: { message: "Mock data not found" },
      },
    };
  }
};

/**
 * Single base query used by all API slices.
 * - When USE_MOCK_API (from redux/config) is true: fetches from public/mock-api.
 * - Otherwise: uses real API at API_URL via fetchBaseQuery.
 */
export const apiBaseQuery = USE_MOCK_API
  ? mockBaseQuery
  : fetchBaseQuery({
      baseUrl: API_URL,
      prepareHeaders: (headers, { getState }) => {
        // Add auth token from cookies if needed (e.g. getCookie(TOEKN_KEY))
        return headers;
      },
    });
