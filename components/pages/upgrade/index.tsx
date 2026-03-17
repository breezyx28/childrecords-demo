"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dialog from "@/components/modals/dialog";
import "@/styles/components/inputs.css";
import React from "react";
import UpgradePlanCard from "@/components/cards/plans/upgrade-plan-card";
import { useLocation, useNavigate } from "react-router-dom";

const monthly = [
  {
    id: 2,
    slug: "basic",
    tag: null,
    current: false,
    title: "Basic monthly",
    tier: "monthly",
    price: "14.99",
    period: "month",
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
    tag: null,
    current: true,
    title: "Premium monthly",
    tier: "monthly",
    price: "19.98",
    period: "month",
    subtitle: "Up to 3 children, including all features.",
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
    id: 4,
    slug: "basic",
    tag: null,
    current: false,
    title: "Basic yearly",
    tier: "yearly",
    price: "70.99",
    old_price: "239.76",
    period: "year",
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
    id: 5,
    slug: "premium",
    tag: null,
    current: false,
    title: "Premium yearly",
    tier: "yearly",
    price: "179.88",
    old_price: null,
    period: "year",
    subtitle: "Up to 3 children, including all features.",
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

const UpgradeAlert = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const isNotDashboard = !/^\/dashboard(\/|$)/.test(pathname); // to detect if the route is not "/dashboard"

  return (
    <>
      <Dialog
        id={`upgrade-dialog`}
        modalClass="!w-full !h-screen !p-[0px] md:w-full !max-w-[100vw] !max-h-[100vh]"
        contentClass="w-full"
        onClose={() => {
          if (isNotDashboard) {
            navigate("/login");
            return;
          }
          return;
        }}
        closeBtn
      >
        <section className="w-full mx-auto h-auto py-[100px] bg-primary-100">
          <div className="w-full">
            <div className="flex flex-col items-center mb-[33px]">
              <h1 className="section-title">{"Upgrade Your Plan"}</h1>
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
                    <UpgradePlanCard
                      id={plan.id}
                      key={plan.id}
                      title={plan.title}
                      subtitle={plan.subtitle}
                      period={plan.period}
                      tier={plan.tier}
                      price={plan.price}
                      features={plan.features}
                      tag={plan.tag}
                      current={plan.current}
                      slug={plan.slug}
                      action={"#"}
                      // currentId={currentId}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="yearly">
                <div className="grid md:grid-cols-2 gap-cols-1 gap-[24px]  mt-[33px]">
                  {yearly.map((plan: any) => (
                    <UpgradePlanCard
                      id={plan.id}
                      key={plan.id}
                      title={plan.title}
                      subtitle={plan.subtitle}
                      period={plan.period}
                      tier={plan.tier}
                      price={plan.price}
                      old_price={plan?.old_price}
                      features={plan.features}
                      tag={plan.tag}
                      current={plan.current}
                      slug={plan.slug}
                      action={"#"}
                      // currentId={currentId}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </Dialog>
    </>
  );
};

export default UpgradeAlert;
