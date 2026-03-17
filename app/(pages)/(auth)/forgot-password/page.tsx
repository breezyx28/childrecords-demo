"use client";

import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { ForgotPasswordValidation } from "./validation";
import Alert from "@/components/alerts";
import { useForgetPasswordMutation } from "@/redux/endpoints/login";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [forgot, { data, isLoading, error, isSuccess }] =
    useForgetPasswordMutation();
  const { controller, displayError } = new ForgotPasswordValidation();

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
    if (data && isSuccess) {
      reset();
      // toast.success(
      //   "Code sent successfully ... check your email for reset steps",
      //   {
      //     duration: 5000,
      //   }
      // );
    }
  }, [data]);

  const onSubmit = async (values: any) => {
    forgot(values);
    setEmail(values.email);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="login-wrapper max-w-[400px] w-full">
        <h1 className="mb-[12px] text-black md:text-[26px] text-[22px] font-[800] md:leading-[38.19px] leading-[28.8px]">
          Forgot Password
        </h1>
        <div className="login-form-container flex flex-col gap-y-[24px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-[8px]"
          >
            {/* @ts-ignore */}
            {error && <Alert type="error" message={error} error={error} />}
            <div className="login-inputs flex flex-col gap-y-[14px]">
              <Input
                option={{
                  type: "email",
                  placeholder: "Email Address",
                  error: errors.email?.message,
                }}
                inputProps={{
                  ...register("email"),
                  id: "email",
                }}
              />
            </div>
            <div className="login-btn flex flex-col gap-y-[20px]">
              <Link
                to="/login"
                className="text-right text-primary-600 text-[14px] font-[650] leading-[18.2px]"
              >
                Login
              </Link>

              <Button type="submit" text="Send email" isLoading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
