import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "@/app/page";
import AuthLayout from "@/app/(pages)/(auth)/layout";
import LoginPage from "@/app/(pages)/(auth)/login/page";
import RegisterPage from "@/app/(pages)/(auth)/register/page";
import ForgotPasswordPage from "@/app/(pages)/(auth)/forgot-password/page";
import VerifyOtpPage from "@/app/(pages)/(auth)/verify-otp/page";
import ResetPasswordPage from "@/app/(pages)/(auth)/reset-password/page";
import AddChildPage from "@/app/(pages)/add-child/page";
import NewsArticlePage from "@/app/(pages)/news/article/page";
import ReportPage from "@/app/(pages)/report/page";
import TermsConditionsPage from "@/app/(pages)/(sub-pages)/terms-conditions/page";
import PrivacyPolicyPage from "@/app/(pages)/(sub-pages)/privacy-policy/page";

import DashboardLayout from "@/app/dashboard/layout";
import DashboardPage from "@/app/dashboard/page";
import RecordsPage from "@/app/dashboard/records/page";
import RecordsFolderPage from "@/app/dashboard/records/[folder-id]/page";
import SelectFolderPage from "@/app/dashboard/records/select-folder/[file-id]/page";
import GrowthChartPage from "@/app/dashboard/growth-chart/page";
import MilestonesPage from "@/app/dashboard/milestones/page";
import MilestoneSlugPage from "@/app/dashboard/milestones/[slug]/page";
import MilestoneActivityPage from "@/app/dashboard/milestones/[slug]/[activity]/page";
import MilestoneActivityDetailsPage from "@/app/dashboard/milestones/[slug]/[activity]/details/page";
import MilestonesCrawlingPage from "@/app/dashboard/milestones/crawling/page";
import MilestonesCrawlingDetailsPage from "@/app/dashboard/milestones/crawling/details/page";
import MilestonesCrawlingArticlePage from "@/app/dashboard/milestones/crawling/article/page";
import TipsPage from "@/app/dashboard/tips/page";
import LessonsPage from "@/app/dashboard/lessons/page";
import RemindersPage from "@/app/dashboard/reminders/page";
import SubscribePage from "@/app/dashboard/subscribe/page";
import UpgradePage from "@/app/dashboard/upgrade/page";
import LearnPage from "@/app/dashboard/learn/page";

import ProfileLayout from "@/app/dashboard/profile/layout";
import ProfilePage from "@/app/dashboard/profile/page";
import ProfileInformationPage from "@/app/dashboard/profile/information/page";
import ProfileChildrensPage from "@/app/dashboard/profile/childrens/page";
import ProfileChildIdPage from "@/app/dashboard/profile/childrens/[child-id]/page";
import ProfileContactPage from "@/app/dashboard/profile/contact/page";
import ProfileSettingsPage from "@/app/dashboard/profile/settings/page";
import ProfileSettingsResetPage from "@/app/dashboard/profile/settings/reset-password/page";
import ProfileSubscriptionPage from "@/app/dashboard/profile/subscription/page";
import ProfileFavouritesPage from "@/app/dashboard/profile/favourites/page";
import ProfileResetPasswordPage from "@/app/dashboard/profile/reset-password/page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="verify-otp" element={<VerifyOtpPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
      <Route path="/add-child" element={<AddChildPage />} />
      <Route path="/news/article" element={<NewsArticlePage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/terms-conditions" element={<TermsConditionsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="records" element={<RecordsPage />} />
        <Route path="records/:folderId" element={<RecordsFolderPage />} />
        <Route path="records/select-folder/:fileId" element={<SelectFolderPage />} />
        <Route path="growth-chart" element={<GrowthChartPage />} />
        <Route path="milestones" element={<MilestonesPage />} />
        <Route path="milestones/crawling" element={<MilestonesCrawlingPage />} />
        <Route path="milestones/crawling/details" element={<MilestonesCrawlingDetailsPage />} />
        <Route path="milestones/crawling/article" element={<MilestonesCrawlingArticlePage />} />
        <Route path="milestones/:slug" element={<MilestoneSlugPage />} />
        <Route path="milestones/:slug/:activity" element={<MilestoneActivityPage />} />
        <Route path="milestones/:slug/:activity/details" element={<MilestoneActivityDetailsPage />} />
        <Route path="tips" element={<TipsPage />} />
        <Route path="lessons" element={<LessonsPage />} />
        <Route path="reminders" element={<RemindersPage />} />
        <Route path="subscribe" element={<SubscribePage />} />
        <Route path="upgrade" element={<UpgradePage />} />
        <Route path="learn" element={<LearnPage />} />

        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="information" element={<ProfileInformationPage />} />
          <Route path="childrens" element={<ProfileChildrensPage />} />
          <Route path="childrens/:childId" element={<ProfileChildIdPage />} />
          <Route path="contact" element={<ProfileContactPage />} />
          <Route path="settings" element={<ProfileSettingsPage />} />
          <Route path="settings/reset-password" element={<ProfileSettingsResetPage />} />
          <Route path="subscription" element={<ProfileSubscriptionPage />} />
          <Route path="favourites" element={<ProfileFavouritesPage />} />
          <Route path="reset-password" element={<ProfileResetPasswordPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
