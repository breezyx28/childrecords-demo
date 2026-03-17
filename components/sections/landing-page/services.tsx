"use client";

import React from "react";
import ServiceCard from "@/components/cards/services/service-card";
import { stagger, useAnimate, motion } from "framer-motion";

const serviceIcons = [
  {
    id: 1,
    src: "/assets/pages/services/growth-icon.svg",
    title: "Comprehensive Growth Tracking",
    description:
      "Monitor your child’s growth journey with our advanced tracking tools. Record essential metrics like height and weight, and visualize their progress over time—celebrate achievements and identify trends!",
  },
  {
    id: 2,
    src: "/assets/pages/services/reminder.svg",
    title: "Proactive Reminders and Notifications",
    description:
      "Stay on top of appointments and milestones. Set personalized reminders for vaccinations, check-ups, and important dates, so you’re always prepared.",
  },
  {
    id: 3,
    src: "/assets/pages/services/monitoring.svg",
    title: "Personalized Milestone Monitoring",
    description:
      "Every child develops at their own pace. Our milestone tracking feature provides personalized insights and expert tips tailored to your child’s age, helping you support their growth effectively.",
  },
  {
    id: 4,
    src: "/assets/pages/services/icons-4.png",
    title: "Effortless Medical Record Digitization",
    description:
      "No more lost papers or frantic searches! Our intuitive platform allows you to easily upload and store your child's medical records digitally, ensuring they’re always accessible when you need them.",
  },
];

const Services = () => {
  const [scope, animate] = useAnimate();

  let motionProps = {
    initial: { opacity: 0, y: "-20" },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      ease: "easeIn",
      duration: 1,
    },
    viewport: { once: true },
  };

  React.useEffect(() => {
    animate(
      ".service-card",
      { opacity: [0, 1], y: ["-10px", "0px"] },
      {
        duration: 1,
        delay: stagger(0.2),
        ease: "easeIn",
      }
    );
  }, []);

  return (
    <section
      id="services"
      className="w-full mx-auto h-auto md:py-[100px] py-[25px] bg-primary-100"
    >
      <div className="wrapper responsive">
        <div className="size-full flex flex-col md:gap-y-[32px] gap-y-[28px] mt-[1rem] md:mt-[0px]">
          <h1 className="section-title">Our Unique Services</h1>
          <div className="services-container size-full">
            <motion.div
              {...motionProps}
              ref={scope}
              className="grid md:grid-cols-2 grid-cols-1 md:gap-[32px] gap-[16px]"
            >
              {serviceIcons?.map((service) => (
                <ServiceCard
                  key={service.id}
                  icon={service.src}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
