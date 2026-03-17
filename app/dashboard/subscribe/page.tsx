"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "@/styles/components/inputs.css";
import PlanCard from "@/components/cards/plans/plan-card";

const monthly = [
  // {
  //   id: 1,
  //   slug: "free",
  //   tag: null,
  //   title: "Free trial",
  //   price: "0.00",
  //   period: "month",
  //   tier: "monthly",
  //   subtitle: "Free trail for first 3 months",
  //   features: [
  //     "Add 1 child",
  //     "Tracking Milstone of developing",
  //     "Daily tips and articles ",
  //     "Moitoring grwoth and weight",
  //     "Share your lovely moments by uploading your picture",
  //     "Monlthy updating report",
  //     "Uploding medical report",
  //     "Reminders",
  //     "Support",
  //   ],
  // },
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
  // {
  //   id: 1,
  //   slug: "free",
  //   tag: null,
  //   title: "Free trial",
  //   price: "0.00",
  //   old_price: null,
  //   period: "3 month",
  //   tier: "yearly",
  //   subtitle: "Free trail for first 3 months",
  //   features: [
  //     "Add 1 child",
  //     "Tracking Milstone of developing",
  //     "Daily tips and articles ",
  //     "Moitoring grwoth and weight",
  //     "Share your lovely moments by uploading your picture",
  //     "Monlthy updating report",
  //     "Uploding medical report",
  //     "Reminders",
  //     "Support",
  //   ],
  // },
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

const SubscribePlan = () => {
  return (
    <section className="w-full mx-auto h-auto">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center mb-[33px]">
          <h1 className="section-title">{"Subscribe To New Plan"}</h1>
        </div>
        <Tabs
          defaultValue="monthly"
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
          <TabsContent value="monthly">
            <div className="grid md:grid-cols-2 gap-cols-1 gap-[24px] mt-[33px]">
              {monthly.map((plan: any) => (
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
              ))}
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="grid md:grid-cols-2 gap-cols-1 gap-[24px] mt-[33px]">
              {yearly.map((plan: any) => (
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SubscribePlan;
