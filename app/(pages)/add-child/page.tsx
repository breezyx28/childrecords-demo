"use client";

import Button from "@/components/buttons/button";
import { Height, Weight } from "@/components/icons";
import DateInputMui from "@/components/inputs/date-input-mui";
import FileUploadInput from "@/components/inputs/file-upload-input";
import Input from "@/components/inputs/input";
import TabInput from "@/components/inputs/tab-input";
import { useAddChildMutation } from "@/redux/endpoints/child";
import React, { useEffect } from "react";
import { ChildValidation } from "./validation";
import { toast } from "sonner";
import Alert from "@/components/alerts";
import objectToFormData from "@/helper/object-to-formdata";
import AddChildLoading from "./loading";
import InputMui from "@/components/inputs/input-mui";
import { suffixHandler } from "@/validator/suffixHandler";
import isAuth from "@/helper/isAuth";
import { plansChildrenRestrictions } from "@/config/plan-module/plans-restrictions";
import { useUserContext } from "@/context/UserContext";
import { Lock01 } from "untitledui-js";

const AddChild = () => {
  const [addChild, { data, isLoading, error, isSuccess }] =
    useAddChildMutation();
  const { controller, displayError } = new ChildValidation();

  const { userInfo } = useUserContext();

  const isRestricted = plansChildrenRestrictions(userInfo as any);

  console.log("userInfo: ", userInfo);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = controller();

  useEffect(() => {
    displayError(error);
  }, [error]);

  // useEffect(() => {
  //   if (data) toast.success("child has been added successfuly"), reset();
  // }, [data]);

  const onSubmit = async (values: any) => {
    if (isRestricted) {
      document.getElementById("upgrade-dialog")?.click();
      return;
    }
    addChild(
      objectToFormData({
        ...values,
        photo: values.photo?.[0],
        weight: String(values?.weight ?? ""),
        height: String(values?.height ?? ""),
      })
    );
  };
  return isSuccess ? (
    <AddChildLoading />
  ) : (
    <div className="w-full max-w-[400px] h-auto my-[2rem] md:px-[0px] px-[20px]">
      <div className="wrapper w-full flex flex-col gap-y-[24px]">
        <h1 className="text-center text-black md:text-[28px] text-[18px] font-[800] md:leading-[38.19px] leading-[28.8px]">
          Hi Ahmed, would you like to add your beloved child?
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-[24px]"
        >
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

          <div className="upload-child-image w-full flex justify-center items-center">
            <FileUploadInput
              label="Child photo"
              option={{
                error: errors.photo?.message,
              }}
              inputProps={{
                ...register("photo"),
                accept: "image/jpg, image/png",
              }}
              watch={watch}
            />
          </div>
          <div className="w-full flex flex-col gap-y-[13px]">
            <TabInput
              error={errors.gender?.message}
              name="gender"
              setValue={setValue}
            />
            <Input
              option={{
                type: "text",
                placeholder: "Child's name",
                error: errors.name?.message,
              }}
              inputProps={{
                ...register("name"),
                id: "name",
              }}
            />
            <DateInputMui
              option={{
                placeholder: "Birthday",
                icon: "",
                error: errors?.birthday?.message,
              }}
              name="birthday"
              setValue={setValue}
            />
            <InputMui
              inputProps={{
                inputMode: "numeric",
                ...register("weight", {
                  onChange: (e) => suffixHandler(e, "weight", "kg", setValue),
                }),
                id: "weight",
                // value: watch("weight"),
              }}
              option={{
                type: "text",
                placeholder: "Weight",
                icon: <Weight />,
                error: errors?.weight?.message,
              }}
            />
            <Input
              inputProps={{
                inputMode: "numeric",
                ...register("height", {
                  onChange: (e) => suffixHandler(e, "height", "cm", setValue),
                }),
                id: "height",
              }}
              option={{
                type: "text",
                placeholder: "Height",
                icon: <Height />,
                error: errors?.height?.message,
              }}
            />
          </div>
          <Button
            type={"submit"}
            text={isRestricted ? "Upgrade plan" : "Add Child"}
            icon={
              isRestricted ? (
                <Lock01 width={20} height={20} color="white" />
              ) : (
                ""
              )
            }
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default isAuth(AddChild);
