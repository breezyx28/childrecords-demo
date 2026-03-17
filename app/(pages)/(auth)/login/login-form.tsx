"use client";

import Button from "@/components/buttons/button";
import GoogleButton from "@/components/buttons/google-button";
import Input from "@/components/inputs/input";
import PasswordInput from "@/components/inputs/password-input";
import { useLoginUserMutation } from "@/redux/endpoints/login";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { LoginValidation } from "./validation";
import Alert from "@/components/alerts";

const LoginForm = () => {
  const [login, { data, isLoading, error }] = useLoginUserMutation();
  const { controller, displayError } = new LoginValidation();

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

  const onSubmit = async (values: any) => login(values);
  return (
    <div className="w-full flex justify-center">
      <div className="login-wrapper max-w-[400px] w-full">
        <h1 className="mb-[12px] text-black md:text-[26px] text-[22px] font-[800] md:leading-[38.19px] leading-[28.8px]">
          Login to your account
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
                  error: errors?.email?.message,
                }}
                inputProps={{
                  ...register("email"),
                  id: "email",
                }}
              />
              <PasswordInput
                option={{
                  placeholder: "Password",
                  error: errors?.password?.message,
                }}
                inputProps={{
                  ...register("password"),
                  id: "password",
                }}
              />
            </div>
            <div className="login-btn flex flex-col gap-y-[20px]">
              <Link
                to="/forgot-password"
                className="text-right text-primary-600 text-[14px] font-[650] leading-[18.2px]"
              >
                Forgot password ?
              </Link>

              <Button type="submit" text="Login" isLoading={isLoading} />
            </div>
          </form>
          <div className="flex flex-col gap-y-[12px]">
            <div className="relative py-[8px] px-[12px]">
              <p className="relative text-center z-[100]">
                <span className="bg-white text-[#535479] text-[14px] font-[600] leading-[18.2px] px-[10px]">
                  Or sign in with Email
                </span>
              </p>
              <span className="absolute left-0 top-[50%] w-full h-[1.4px] bg-[#E9ECF1] z-[50]"></span>
            </div>
            <div className="w-full flex items-center justify-center">
              <GoogleButton />
            </div>
          </div>
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

export default LoginForm;
