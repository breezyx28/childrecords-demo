"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Dialog from "@/components/modals/dialog";
import Input from "../inputs/input";
import { ContactUsValidation } from "@/validator/Validation/ContactUsValidation";
import { useSubmitContactMutation } from "@/redux/endpoints/contact";
import Button from "./button";
import Alert from "../alerts";
import { toast } from "sonner";
import ValidationError from "../states/errors/validationError";

export const FloatingCustomerButton = () => {
  const flotingModalID = "floating-modal";

  const [isVisible, setIsVisible] = useState(true);
  const [submitContact, { data, isLoading, error }] =
    useSubmitContactMutation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Check if we're within 400px of the bottom of the page
      const threshold = 400;
      const isNearBottom = scrollY + viewportHeight >= pageHeight - threshold;

      setIsVisible(!isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { controller, displayError } = new ContactUsValidation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = controller();

  useEffect(() => {
    if (error) {
      displayError(error);
    }
  }, [error]);

  useEffect(() => {
    if (data?.success) {
      // toast.success("Thank you for contacting us..");
      const timeout = setTimeout(() => {
        reset();
        document.getElementById(flotingModalID)?.click();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [data]);

  const onSubmit = async (values: any) => submitContact(values);

  return (
    <>
      <div
        className="absolute size-full"
        onClick={() => document.getElementById(flotingModalID)?.click()}
      >
        <motion.button
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          type="button"
          className="fixed right-[2.5%] bottom-[5%] bg-primary-600 md:p-[18px] p-[12px] rounded-full shadow z-[10] hover:scale-[1.5] duration-200 eass-in"
        >
          <svg
            width={24}
            height={24}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white md:w-auto md:h-auto w-[20px] h-[20px]"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10Z" />
          </svg>
        </motion.button>
      </div>

      <Dialog closeBtn id={flotingModalID}>
        {/* @ts-ignore */}
        {error && (
          <Alert
            type="error"
            message={
              // @ts-ignore
              error?.message
            }
            error={error}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-bold text-center">Contact Us</h1>
              <p className="text-stone-500 font-semibold text-center">
                We are happy to hear from you.
              </p>
            </div>
            <div className="grid gap-6 py-4">
              <div className="w-full flex flex-col items-start gap-3">
                <Input
                  option={{
                    type: "tel",
                    className: "",
                    error: errors?.phone?.message,
                    placeholder: "Phone",
                  }}
                  inputProps={{
                    ...register("phone"),
                  }}
                />
              </div>
              <div className="flex flex-col">
                <textarea
                  {...register("message")}
                  rows={6}
                  placeholder="Type your message"
                  className="border px-[12px] py-[18px] rounded-[16px] px-[12px] text-[#83868B] text-[16px] font-[500] leading-[19.84px]"
                />
                {/* @ts-ignore */}
                {errors?.message?.message && (
                  // @ts-ignore
                  <ValidationError text={errors?.message?.message} />
                )}
              </div>
            </div>

            <Button
              isLoading={isLoading}
              text="Send"
              type="submit"
              className="w-full"
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};
