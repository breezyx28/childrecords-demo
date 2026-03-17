"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import ServiceSection from "./more-services/service-section";
import { ServiceDetailsCardsProps } from "@/types";

const ServicesDetails: ServiceDetailsCardsProps = [
  {
    dir: "ltr",
    title: "Top-Notch Security",
    subTitle:
      "Your child's information is protected with advanced encryption, so you can focus on what truly matters—your child's well-being.",
    list: [
      "Advanced encryption technology",
      "Data protection ensured",
      "Focus on well-being",
    ],
    button: {
      title: "Create account",
      href: "/register",
    },
  },
  {
    dir: "rtl",
    title: "User-Friendly Experience",
    subTitle:
      "Navigate our platform effortlessly on any device, making it easy to access records anytime, anywhere.",
    list: [
      "Information accessibility",
      "Smooth device navigation",
      "Access records easily",
    ],
    button: {
      title: "Create account",
      href: "/register",
    },
  },
  {
    dir: "ltr",
    title: "Tailored Support",
    subTitle:
      "Enjoy personalized tips and reminders that help you nurture your child's health and development every step of the way.",
    list: [
      "Helpful development reminders",
      "Guidance through stages",
      "Tailored health tips",
    ],
    button: {
      title: "Create account",
      href: "/register",
    },
  },
];

const MoreServices = () => {
  return (
    <section id="more-services" className="w-full mx-auto h-auto">
      <div className="wrapper flex flex-col">
        {ServicesDetails.map((item, index) => (
          <ScrollReveal
            key={index}
            variant={item.dir === "rtl" ? "slideRight" : "slideLeft"}
            delay={index * 0.12}
            duration={0.6}
          >
            <ServiceSection
              dir={item.dir}
              title={item.title}
              subTitle={item.subTitle}
              list={item.list}
              button={item.button}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default MoreServices;

// old data
// const ServicesDetails: ServiceDetailsCardsProps = [
//   {
//     dir: "ltr",
//     title: "Top-Notch Security",
//     subTitle:
//       "Your child's information is protected with advanced encryption, so you can focus on what truly matters—your child's well-being.",
//     list: [
//       "Your child's information is kept secure with advanced encryption technology.",
//       "This ensures their data is protected from unauthorized access.",
//       "With this security in place, you can focus on your child's well-being without concerns.",
//     ],
//     button: {
//       title: "Create account",
//       href: "/register",
//     },
//   },
//   {
//     dir: "rtl",
//     title: "User-Friendly Experience",
//     subTitle:
//       "Navigate our platform effortlessly on any device, making it easy to access records anytime, anywhere.",
//     list: [
//       "Our platform is designed for smooth navigation across all devices.",
//       "You can easily access your child's records whenever you need them.",
//       "Whether at home or on the go, your child's information is always within reach.",
//     ],
//     button: {
//       title: "Create account",
//       href: "/register",
//     },
//   },
//   {
//     dir: "ltr",
//     title: "Tailored Support",
//     subTitle:
//       "Enjoy personalized tips and reminders that help you nurture your child's health and development every step of the way.",
//     list: [
//       "Receive tailored tips that support your child's health and growth.",
//       "Get helpful reminders to stay on track with their development.",
//       "These personalized insights guide you through each stage of their journey.",
//     ],
//     button: {
//       title: "Create account",
//       href: "/register",
//     },
//   },
// ];
