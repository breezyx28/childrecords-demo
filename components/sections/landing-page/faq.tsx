"use client";

import React from "react";
import Button from "@/components/buttons/button";
import FaqCard from "@/components/cards/faq/faq-card";

const faqs = [
  {
    question: "How easy is it to digitize my child's records?",
    answer:
      "In just a few clicks, you can upload your documents. We’ll take care of converting them into secure digital files, making record-keeping a breeze!",
  },
  {
    question: "Is my child’s information truly secure?",
    answer:
      "Yes! We utilize advanced security protocols to protect your data, ensuring your child's information is confidential and safe.",
  },
  {
    question: "Can I use the platform on different devices?",
    answer:
      "Absolutely! Access your child’s records anytime, anywhere—whether on your smartphone, tablet, or computer.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Absolutely! We offer a free trial so you can explore all our features before committing.",
  },
  {
    question: "What if I need assistance?",
    answer:
      "Our friendly support team is here to help! Reach out via chat or email anytime you have questions.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="w-full mx-auto h-auto md:py-[100px] py-[50px]">
      <div className="wrapper flex flex-col">
        <div className="wrapper flex md:flex-row flex-col md:gap-x-[40px] gap-x-[0px]">
          <div className="flex flex-col min-h-[225px] h-full max-w-[600px]">
            <div
              className={
                "faq-container flex flex-col md:gap-y-[40px] gap-y-[20px]"
              }
            >
              <div className="faq-details flex flex-col gap-y-[24px]">
                <h1 className="section-title">FAQ</h1>
                <h6 className="section-subtitle">
                  Sign up hassle-free and start managing your child’s health
                  data within minutes and your data is secured.
                </h6>
              </div>
              <div className="faq-button">
                <Button
                  text={"Contact us"}
                  href={"mailto:childrecords.domain@gmail.com"}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-[16px]">
            {faqs?.map((faq, index) => (
              <FaqCard
                key={index}
                id={index}
                answer={faq.answer}
                question={faq.question}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
