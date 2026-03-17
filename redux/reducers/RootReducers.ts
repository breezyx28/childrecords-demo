import { accountApi } from "../endpoints/account";
import { applicationsApi } from "../endpoints/applications";
import { chatApi } from "../endpoints/chat";
import { childApi } from "../endpoints/child";
import { conferenceApi } from "../endpoints/conference";
import { contactUsApi } from "../endpoints/contact";
import { documentsApi } from "../endpoints/documents";
import { growthChartApi } from "../endpoints/growth-chart";
import { lessonsApi } from "../endpoints/lessons";
import { loginApi } from "../endpoints/login";
import { milestonesApi } from "../endpoints/milestones";
import { newsletterApi } from "../endpoints/newsletter";
import { notificationsApi } from "../endpoints/notifications";
import { profileApi } from "../endpoints/profile";
import { recordsApi } from "../endpoints/records";
import { reminderApi } from "../endpoints/reminder";
import { monthlyReportApi } from "../endpoints/report";
import { servicesApi } from "../endpoints/services";
import { statisticsApi } from "../endpoints/statistics";
import { subscriptionApi } from "../endpoints/subscription";
import { tipsApi } from "../endpoints/tips";
import { partnerVisitorApi } from "../endpoints/visitor";
import { alertReducer } from "../slices/alertSlice";
import { userReducer } from "../slices/userSlice";

export const Reducers = {
  // Add the generated reducer as a specific top-level slice
  [loginApi.reducerPath]: loginApi.reducer,
  [tipsApi.reducerPath]: tipsApi.reducer,
  [contactUsApi.reducerPath]: contactUsApi.reducer,
  [lessonsApi.reducerPath]: lessonsApi.reducer,
  [childApi.reducerPath]: childApi.reducer,
  [milestonesApi.reducerPath]: milestonesApi.reducer,
  [growthChartApi.reducerPath]: growthChartApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
  [servicesApi.reducerPath]: servicesApi.reducer,
  [applicationsApi.reducerPath]: applicationsApi.reducer,
  [conferenceApi.reducerPath]: conferenceApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [recordsApi.reducerPath]: recordsApi.reducer,
  [reminderApi.reducerPath]: reminderApi.reducer,
  [notificationsApi.reducerPath]: notificationsApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [statisticsApi.reducerPath]: statisticsApi.reducer,
  [documentsApi.reducerPath]: documentsApi.reducer,
  [newsletterApi.reducerPath]: newsletterApi.reducer,
  [monthlyReportApi.reducerPath]: monthlyReportApi.reducer,
  [partnerVisitorApi.reducerPath]: partnerVisitorApi.reducer,
  alert: alertReducer,
  userInfo: userReducer,
};
