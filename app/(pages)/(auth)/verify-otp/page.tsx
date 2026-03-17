"use client";

import Button from "@/components/buttons/button";
import { useVerifyResetPasswordOTPMutation } from "@/redux/endpoints/login";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { VerifyOtpValidation } from "./validation";
import Alert from "@/components/alerts";
import { OtpInput } from "@/components/inputs/otp-input";
import { toast } from "sonner";

const VerifyOtp = () => {
  const [verify, { data, isLoading, error }] =
    useVerifyResetPasswordOTPMutation();
  const { controller, displayError } = new VerifyOtpValidation();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = controller();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const completed = code && email;

  const onSubmit = async (values: any) => verify(values);

  useEffect(() => {
    if (completed && !hasSubmitted) {
      setValue("email", email as string);
      setValue("code", code as string);

      setHasSubmitted(true);
      handleSubmit(onSubmit)();
    }
    if (!completed) {
      toast.error("No email or code provided. Redirecting...");
      setTimeout(() => {
        navigate("/forgot-password");
      }, 3000);
    }
  }, [completed, setValue, handleSubmit, onSubmit, hasSubmitted]);

  useEffect(() => {
    if (error) {
      console.log("error: ", error);
      displayError(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      navigate("/reset-password");
    }
  }, [data, router]);

  return (
    <div className="w-full flex justify-center">
      <div className="verify-wrapper max-w-[400px] w-full">
        <h1 className="mb-[12px] text-black md:text-[26px] text-[22px] font-[800] md:leading-[38.19px] leading-[28.8px]">
          Code Verification
        </h1>
        <div className="login-form-container flex flex-col gap-y-[24px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-[8px]"
          >
            {/* @ts-ignore */}
            {error && <Alert type="error" message={error} error={error} />}
            {errors?.email?.message && (
              // @ts-ignore
              <span className="text-error-600">{errors?.email?.message}</span>
            )}

            {/*  */}
            <input type="hidden" value={email ?? ""} {...register("email")} />

            <div className="login-inputs flex flex-col gap-y-[20px]">
              <OtpInput
                name="code"
                setValue={setValue}
                error={errors?.code?.message ?? ""}
                initialValue={code ?? undefined}
              />
            </div>
            <div className="login-btn flex flex-col gap-y-[20px] mt-[40px]">
              <Button type="submit" text="verify" isLoading={isLoading} />
            </div>
          </form>
          <div className="text-center inline text-[15px] font-[600] leading-[19.84px]">
            <span className="text-black">Not registered ?</span>{" "}
            <Link to="/forgot-password" className="text-primary-600">
              Back to forgot password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
