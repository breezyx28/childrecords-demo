"use client";

import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useLoginUserMutation } from "@/redux/endpoints/login";
import PasswordInput from "@/components/inputs/password-input";
import { ResetPasswordValidation } from "./validation";
import { DashBoardBreadcrumbs } from "@/components/breadcrumbs";
import Alert from "@/components/alerts";

const Settings = () => {
  const [login, { data, isLoading, error }] = useLoginUserMutation();
  const { controller, displayError } = new ResetPasswordValidation();

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
    <div>
      <div className="reset-pwd-wrapper max-w-[400px] w-full">
        <DashBoardBreadcrumbs
          pages={[
            {
              href: "/dashboard/profile/settings",
              title: "Settings",
            },
            {
              href: "/dashboard/profile/reset-password",
              title: "Reset Password",
            },
          ]}
        />
        <h1 className="mb-[12px] text-[#83868B] text-[12px] font-[700] leading-[15.6px] mt-[2rem]">
          Reset Password
        </h1>
        <div className="reset-pwd-form-container flex flex-col gap-y-[24px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-[8px]"
          >
            {/* @ts-ignore */}
            {error && (
              //  @ts-ignore
              <Alert type="error" message={error?.message} error={error} />
            )}
            <div className="reset-pwd-inputs flex flex-col gap-y-[14px]">
              <PasswordInput
                option={{
                  placeholder: "Old Password",
                  error: errors.old_password?.message,
                }}
                inputProps={{
                  ...register("old_password"),
                  id: "old_password",
                }}
              />
              <PasswordInput
                option={{
                  placeholder: "Reset Password",
                  error: errors.reset_password?.message,
                }}
                inputProps={{
                  ...register("reset_password"),
                  id: "reset_password",
                }}
              />
            </div>
            <Button type="submit" text="Update" isLoading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
