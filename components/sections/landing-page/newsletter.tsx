"use client";


import React, { useEffect } from "react";
import Button from "@/components/buttons/button";
import { useSubscribeToNewsletterMutation } from "@/redux/endpoints/newsletter";
import { NewsLetterValidation } from "@/validator/Validation/NewsLetterValidation";
import { twMerge } from "tailwind-merge";
import LottieCheck from "@/components/lottie/check";
import { toast } from "sonner";

const Newsletter = () => {
  const [subscribe, { data, isLoading, error, isSuccess }] =
    useSubscribeToNewsletterMutation();
  const { controller, displayError } = new NewsLetterValidation();

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
    if (data) reset();
  }, [data]);

  useEffect(() => {
    if (errors?.email?.message) {
      // toast.error(errors?.email?.message as string);
    }
  }, [errors?.email?.message]);

  const onSubmit = async (values: any) => subscribe(values);

  return (
    <section
      id="newsletter"
      className="max-w-[1440px] w-full mx-auto h-auto md:p-[100px] p-[0px] py-[40px] flex justify-center items-center md:bg-transparent bg-primary-600"
    >
      <div className="wrapper relative w-full md:max-h-[400px] max-w-auto md:bg-primary-600 bg-transparent rounded-[40px] md:overflow-hidden overflow-none">
        {/* Sticky clouds container */}
        <div className="sticky top-0 size-full z-2">
          <div className="absolute top-[21px] left-[54px]">
            <img 
              src={"/assets/icons/clouds/cloud-border.png"}
              width={166}
              height={144}
              alt="cloud"
            />
          </div>

          <div className="absolute md:top-[288px] md:left-[1155px] top-[88%] left-[10px]">
            <img 
              src={"/assets/icons/clouds/cloud.png"}
              width={97}
              height={68}
              alt="cloud"
            />
          </div>
        </div>

        <div className="relative newsletter-container md:px-[200px] px-[20px] md:py-[80px] py-[40px]">
          <div className="h-auto flex flex-col gap-y-[32px]">
            <div className="newsletter-details text-center md:px-[30px] px-[10px] flex flex-col gap-y-[12px]">
              <h1 className="section-title text-white">
                Subscribe For Newsletter
              </h1>
              <p className="section-subtitle text-white">
                {`To receive the latest updates and health tips straight in your
                inbox about the best practices for managing your children's
                health records.`}
              </p>
            </div>
            <div className="newsletter-action w-full z-3">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={twMerge(
                  "w-full bg-white rounded-[100px] md:p-[8px] p-[4px] flex justify-between",
                  errors?.email?.message && "border-2 border-error-600"
                )}
              >
                <input
                  type="email"
                  {...register("email")}
                  name="email"
                  placeholder="Enter email address"
                  className="w-full border-0 rounded-[100px] bg-transparent outline-none md:px-[30px] px-[15px] text-[#83868B] md:text-[20px] text-[14px] md:leading-[24.8px] leading-normal font-[500]"
                />

                <Button
                  type="submit"
                  text={isSuccess ? "Done" : "Subscribe"}
                  className={twMerge(
                    "transition-all rounded-[100px] px-[20px] md:py-[16px] py-[12px] md:px-[48px]"
                  )}
                  icon={isSuccess ? <LottieCheck /> : ""}
                  isLoading={isLoading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
