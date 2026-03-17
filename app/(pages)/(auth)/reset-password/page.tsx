"use client";

import Button from "@/components/buttons/button";
import GoogleButton from "@/components/buttons/google-button";
import Input from "@/components/inputs/input";
import PasswordInput from "@/components/inputs/password-input";
import { useLoginUserMutation } from "@/redux/endpoints/login";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import Alert from "@/components/alerts";
import { ResetPasswordValidation } from "./validation";
import { toast } from "sonner";

const Login = () => {
  const [resetPassword, { data, isLoading, error }] = useLoginUserMutation();
  const { controller, displayError } = new ResetPasswordValidation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = controller();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (email) {
      setValue("email", email as string);
    } else {
      // toast.error("No email provided. Redirecting...");
      setTimeout(() => {
        navigate("/forgot-password");
      }, 3000);
    }
  }, [email, setValue, router]);

  useEffect(() => {
    if (error) {
      console.log("error: ", error);

      displayError(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      reset();
      navigate("/login");
    }
  }, [data, reset, router]);

  watch();

  const onSubmit = async (values: any) => resetPassword(values);
  return (
    <div className="w-full flex justify-center">
      <div className="login-wrapper max-w-[400px] w-full">
        <h1 className="mb-[12px] text-black md:text-[26px] text-[22px] font-[800] md:leading-[38.19px] leading-[28.8px]">
          Reset Password
        </h1>
        <div className="login-form-container flex flex-col gap-y-[24px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-[8px]"
          >
            {/* @ts-ignore */}
            {error && <Alert type="error" message={error} error={error} />}

            <input type="hidden" {...register("email")} />

            <div className="login-inputs flex flex-col gap-y-[14px]">
              <PasswordInput
                option={{
                  placeholder: "Password",
                  error: errors.password?.message,
                }}
                inputProps={{
                  ...register("password"),
                  id: "password",
                }}
              />
              <PasswordInput
                option={{
                  placeholder: "Confirm Password",
                  error: errors.password_confirmation?.message,
                }}
                inputProps={{
                  ...register("password_confirmation"),
                  id: "password_confirmation",
                }}
              />
            </div>
            <div className="login-btn flex flex-col gap-y-[20px] mt-[30px]">
              <Button type="submit" text="Login" isLoading={isLoading} />
            </div>
          </form>

          <div className="text-center inline text-[15px] font-[600] leading-[19.84px]">
            <span className="text-black">Not registered ?</span>{" "}
            <Link to="/register" className="text-primary-600">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
