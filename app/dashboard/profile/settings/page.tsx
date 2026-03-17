"use client";

import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { UpdateAccountValidation } from "./validation";
import { useLoginUserMutation } from "@/redux/endpoints/login";
import { DashBoardBreadcrumbs } from "@/components/breadcrumbs";
import Alert from "@/components/alerts";
import NationalityInput from "@/app/(pages)/(auth)/register/nationality-input";
import { useMyInfo } from "@/hooks/useMyInfo";
import { useUpdateProfileInfoMutation } from "@/redux/endpoints/account";
import { toast } from "sonner";
import { useGetMyInfoQuery } from "@/redux/endpoints/profile";

const Settings = () => {
  const [updateInfo, { data, isLoading, error }] =
    useUpdateProfileInfoMutation();
  const { refetch: refetchMyInfo } = useGetMyInfoQuery({});
  const { controller, displayError } = new UpdateAccountValidation();

  const myInfo = useMyInfo();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = controller();

  useEffect(() => {
    if (error) {
      displayError(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // toast.success("Informations updated successfuly");
      refetchMyInfo();
    }
  }, [data]);

  useEffect(() => {
    if (myInfo) {
      reset({
        fullname: myInfo.fullname ?? null,
        email: myInfo.email ?? null,
        nationality: myInfo.nationality ?? null,
      });
    }
  }, [myInfo, reset]);

  const onSubmit = async (values: any) => updateInfo(values);

  return (
    <div>
      <div className="settings-wrapper w-full">
        <DashBoardBreadcrumbs
          pages={[
            {
              href: "/dashboard/profile/settings",
              title: "Settings",
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
              <Input
                option={{
                  type: "text",
                  placeholder: "Full name",
                  error: errors?.fullname?.message,
                  focuseState: true,
                }}
                inputProps={{
                  ...register("fullname"),
                  id: "fullname",
                  defaultValue: myInfo?.fullname,
                }}
              />
              <Input
                option={{
                  type: "email",
                  placeholder: "Email Address",
                  error: errors?.email?.message,
                  focuseState: true,
                }}
                inputProps={{
                  ...register("email"),
                  id: "email",
                  defaultValue: myInfo?.email,
                }}
              />
              <NationalityInput
                name="nationality"
                language="en"
                error={errors?.nationality?.message}
                setValue={setValue}
                defaultValue={myInfo?.nationality ?? ""}
              />
            </div>
            <Button type="submit" text="Update" isLoading={isLoading} />
            <div className="settings-btn flex flex-col gap-y-[16px]">
              <p className="text-[#83868B] text-[12px] font-[700] leading-[15.6px]">
                Password Settings
              </p>
              <Link
                to="/dashboard/profile/settings/reset-password"
                className="text-black text-[14px] font-[650] leading-[18.2px] underline"
              >
                Reset password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
