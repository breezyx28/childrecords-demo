"use client";

import Button from "@/components/buttons/button";
import GoogleButton from "@/components/buttons/google-button";
import Input from "@/components/inputs/input";
import PasswordInput from "@/components/inputs/password-input";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { RegisterValidation } from "./validation";
import { useRegisterUserMutation } from "@/redux/endpoints/login";
import { toast } from "sonner";
import Alert from "@/components/alerts";
import NationalityInput from "./nationality-input";

const Register = () => {
  const [createAccount, { data, isLoading, error }] = useRegisterUserMutation();
  const { controller, displayError } = new RegisterValidation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = controller();

  useEffect(() => {
    displayError(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      // toast.success(data?.message);

      setTimeout(() => {
        navigate("/add-child");
      }, 2000);
      reset();
    }
  }, [data]);

  const onSubmit = async (values: any) => createAccount(values);
  return (
    <div className="w-full flex justify-center">
      <div className="login-wrapper max-w-[400px] w-full">
        <h1 className="mb-[12px] text-black text-[26px] font-[800] leading-[38.19px]">
          Create new account
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
                  type: "text",
                  placeholder: "Full name",
                  error: errors?.fullname?.message,
                }}
                inputProps={{
                  ...register("fullname"),
                  id: "fullname",
                }}
              />
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

              <NationalityInput
                name="nationality"
                language="en"
                error={errors?.nationality?.message}
                setValue={setValue}
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
            <div className="login-btn flex flex-col gap-y-[24px]">
              <Link
                to="/forgot-password"
                className="text-right text-primary-600 text-[14px] font-[650] leading-[18.2px]"
              >
                Forgot password ?
              </Link>

              <Button
                type="submit"
                text="Create account"
                isLoading={isLoading}
              />
            </div>
          </form>
          <div className="flex flex-col gap-y-[14px]">
            <div className="relative py-[8px] px-[12px]">
              <p className="relative text-center z-[100]">
                <span className="bg-white text-[#535479] text-[14px] font-[600] leading-[18.2px] px-[10px]">
                  Or sign up with Email
                </span>
              </p>
              <span className="absolute left-0 top-[50%] w-full h-[1.4px] bg-[#E9ECF1] z-[50]"></span>
            </div>
            <div className="w-full flex items-center justify-center">
              <GoogleButton />
            </div>
          </div>
          <div className="text-center inline text-[15px] font-[600] leading-[19.84px]">
            <span className="text-black">Have account ?</span>{" "}
            <Link to="/login" className="text-primary-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
