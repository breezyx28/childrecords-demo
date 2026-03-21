"use client";

import PlanCard from "@/components/cards/plans/plan-card";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import "@/styles/components/inputs.css";
import { useSearchParams } from "react-router-dom";
import Dialog from "@/components/modals/dialog";
import { CardRemove1, TickCircle } from "iconsax-react";
import {
  useHandleCancelPayment,
  useHandleSuccessPayment,
} from "@/hooks/useOnStartup";

const monthly = [
  {
    id: 1,
    slug: "free",
    tag: null,
    title: "Free trial",
    price: "0.00",
    period: "month",
    tier: "monthly",
    subtitle: "Free trail for first 3 months",
    features: [
      "Add 1 child",
      "Tracking Milstone of developing",
      "Daily tips and articles ",
      "Monitoring grwoth and weight",
      "Share your lovely moments by uploading your picture",
      "Monlthy updating report",
      "Uploding medical report",
      "Reminders",
      "Support",
    ],
  },
  {
    id: 2,
    slug: "basic",
    tag: null,
    title: "Basic monthly",
    price: "14.99",
    period: "month",
    tier: "monthly",
    subtitle: "Unlimited features",
    features: [
      "Add 1 child",
      "Tracking milestone of development",
      "Monitoring growth and weight",
      "Daily tips and articles",
      "Share your lovely moments by uploading your picture",
      "Monthly updating report",
      "Uploading medical report",
      "Reminders",
      "Support",
    ],
  },
  {
    id: 3,
    slug: "premium",
    tag: "Best Value",
    title: "Premium monthly",
    price: "19.98",
    period: "month",
    tier: "monthly",
    subtitle: "Up to 3 children, including all features from the Basic Plan.",
    features: [
      "Upto 3 children",
      "Monitoring growth",
      "Monthly updated report",
      "Daily tips and articles",
      "Tracking milestone development",
      "Share your lovely moments by uploading your picture",
      "Uploading reports",
      "Supports",
    ],
  },
];
const yearly = [
  {
    id: 1,
    slug: "free",
    tag: null,
    title: "Free trial",
    price: "0.00",
    old_price: null,
    period: "3 month",
    tier: "yearly",
    subtitle: "Free trail for first 3 months",
    features: [
      "Add 1 child",
      "Tracking Milstone of developing",
      "Daily tips and articles ",
      "Moitoring grwoth and weight",
      "Share your lovely moments by uploading your picture",
      "Monlthy updating report",
      "Uploding medical report",
      "Reminders",
      "Support",
    ],
  },
  {
    id: 2,
    slug: "basic",
    tag: null,
    title: "Basic yearly",
    price: "70.99",
    old_price: "239.76",
    period: "year",
    tier: "yearly",
    subtitle: "Unlimited features",
    features: [
      "Add 1 child",
      "Tracking milestone of development",
      "Monitoring growth and weight",
      "Daily tips and articles",
      "Share your lovely moments by uploading your picture",
      "Monthly updating report",
      "Uploading medical report",
      "Reminders",
      "Support",
    ],
  },
  {
    id: 3,
    slug: "premium",
    tag: "Best Value",
    title: "Premium yearly",
    price: "179.88",
    old_price: null,
    period: "year",
    tier: "yearly",
    subtitle: "Up to 3 children, including all features from the Basic Plan.",
    features: [
      "Upto 3 children",
      "Monitoring growth",
      "Monthly updated report",
      "Daily tips and articles",
      "Tracking milestone development",
      "Share your lovely moments by uploading your picture",
      "Uploading reports",
      "Supports",
    ],
  },
];

const Plans = () => {
  const [searchParams] = useSearchParams();
  const { paymentSuccess } = useHandleSuccessPayment();
  const { paymentCancelled } = useHandleCancelPayment();
  const [tab, setTab] = useState<"monthly" | "yearly">("monthly");

  return (
    <section
      id="plans"
      className="mx-auto h-auto w-full min-w-0 max-w-full bg-primary-100 py-[20px] md:py-[100px]"
    >
      <div className="wrapper responsive">
        <div className="flex flex-col items-center mb-[33px]">
          <h1 className="section-title">{"Subscription & Plans"}</h1>
        </div>
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "monthly" | "yearly")}
          className="w-full flex flex-col items-center"
        >
          <TabsList className="max-w-[300px] w-full h-full bg-white border-2 border-[#E9ECF1] rounded-full p-[5px] gap-[12px]">
            <TabsTrigger
              className="tab-input-monthly tab-input-switch py-[12px]"
              value="monthly"
            >
              <span className="ml-[8px] text-[#83868B] tab-input-icon">
                Monthly
              </span>
            </TabsTrigger>
            <TabsTrigger
              className="tab-input-yearly tab-input-switch py-[12px]"
              value="yearly"
            >
              <span className="ml-[8px] text-[#83868B] tab-input-icon">
                Yearly
              </span>
            </TabsTrigger>
          </TabsList>
          <div className="w-full mt-[33px] min-h-[280px] relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid md:grid-cols-3 gap-cols-1 gap-[24px]"
              >
                {tab === "monthly"
                  ? monthly.map((plan: any) => (
                      <PlanCard
                        key={plan.id}
                        title={plan.title}
                        subtitle={plan.subtitle}
                        period={plan.period}
                        tier={plan.tier}
                        price={plan.price}
                        features={plan.features}
                        tag={plan.tag}
                        slug={plan.slug}
                        action={"#"}
                      />
                    ))
                  : yearly.map((plan: any) => (
                      <PlanCard
                        key={plan.id}
                        title={plan.title}
                        subtitle={plan.subtitle}
                        period={plan.period}
                        tier={plan.tier}
                        price={plan.price}
                        old_price={plan?.old_price}
                        features={plan.features}
                        tag={plan.tag}
                        slug={plan.slug}
                        action={"#"}
                      />
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
      <Dialog
        closeBtn
        id="subscription-successfuly-dialog"
        contentClass="w-full"
        forceDisplay={paymentSuccess ?? false}
        onClose={() =>
          (window.location.href = "/dashboard/profile/subscription")
        }
      >
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col items-center justify-center">
            <TickCircle size="120" color="#37d67a" variant="Bulk" />
            <span className="text-black text-[20px] font-[700px] text-center">
              Congratulations
            </span>
          </div>
          <div className="flex flex-col gap-y-[16px] justify-center">
            <span className="inline text-center text-black text-[16px] font-[500] leading-[19.8px]">
              You successfully subscribed to{" "}
              <strong className="text-[20px] font-[800] capitalize">
                {searchParams?.get("tier")} {" / "}
                {searchParams?.get("plan")}
              </strong>{" "}
              plan
            </span>
          </div>
        </div>
      </Dialog>
      <Dialog
        closeBtn
        id="subscription-cancelled-dialog"
        contentClass="w-full"
        forceDisplay={paymentCancelled ?? false}
        onClose={() =>
          (window.location.href = "/dashboard/profile/subscription")
        }
      >
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col items-center justify-center">
            <CardRemove1 size="120" color="#f47373" variant="Bulk" />
          </div>
          <div className="flex flex-col gap-y-[16px] justify-center">
            <span className="inline text-center text-black text-[16px] font-[500] leading-[19.8px]">
              Your{" "}
              <strong className="font-[800]">
                {searchParams?.get("plan")}
                {" / "}
              </strong>{" "}
              plan has been{" "}
              <strong className="text-error-500">Cancelled</strong>
            </span>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default Plans;
