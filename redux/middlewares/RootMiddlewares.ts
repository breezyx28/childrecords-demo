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
import { rtkQueryErrorLogger } from "./HandleGlobalErrors";

export const Middlewares = [
  rtkQueryErrorLogger,
  loginApi.middleware,
  contactUsApi.middleware,
  tipsApi.middleware,
  lessonsApi.middleware,
  childApi.middleware,
  milestonesApi.middleware,
  growthChartApi.middleware,
  accountApi.middleware,
  servicesApi.middleware,
  conferenceApi.middleware,
  applicationsApi.middleware,
  profileApi.middleware,
  recordsApi.middleware,
  reminderApi.middleware,
  notificationsApi.middleware,
  subscriptionApi.middleware,
  chatApi.middleware,
  statisticsApi.middleware,
  documentsApi.middleware,
  newsletterApi.middleware,
  monthlyReportApi.middleware,
  partnerVisitorApi.middleware,
];
