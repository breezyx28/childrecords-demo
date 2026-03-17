"use client";

import Button from "@/components/buttons/button";
import React, { useEffect } from "react";

import { DashBoardBreadcrumbs } from "@/components/breadcrumbs";
import Alert from "@/components/alerts";
import { ResetPasswordValidation } from "./validation";
import PasswordInput from "@/components/inputs/password-input";
import { useResetPasswordMutation } from "@/redux/endpoints/account";
import { toast } from "sonner";

const Settings = () => {
  const [resetPassword, { data, isLoading, error }] =
    useResetPasswordMutation();
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
    if (data) {
      // toast.success("Password updated successfuly");
      reset();
    }
  }, [data]);

  const onSubmit = async (values: any) => resetPassword(values);

  return (
    <div>
      <div className="settings-wrapper max-w-[400px] w-full">
        <DashBoardBreadcrumbs
          pages={[
            {
              href: "/dashboard/profile/settings",
              title: "Settings",
            },
            {
              href: "/dashboard/profile/settings/reset-password",
              title: "Reset Password",
            },
          ]}
        />
        <div className="settings-form-container flex flex-col gap-y-[24px] mt-[2rem]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-[8px]"
          >
            {/* @ts-ignore */}
            {error && (
              // @ts-ignore
              <Alert type="error" message={error?.message} error={error} />
            )}
            <div className="settings-inputs flex flex-col gap-y-[14px]">
              <PasswordInput
                option={{
                  placeholder: "Old Password",
                  error: errors?.old_password?.message,
                }}
                inputProps={{
                  ...register("old_password"),
                  id: "old_password",
                }}
              />
              <PasswordInput
                option={{
                  placeholder: "New password",
                  error: errors?.new_password?.message,
                }}
                inputProps={{
                  ...register("new_password"),
                  id: "new_password",
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
