"use client";

import {
  useEditChildMutation,
  useGetCurrentchildQuery,
} from "@/redux/endpoints/child";
import React, { useEffect } from "react";
import { UpdateChildValidation } from "./validation";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import objectToFormData from "@/helper/object-to-formdata";
import Alert from "@/components/alerts";
import FileUploadInput from "@/components/inputs/file-upload-input";
import TabInput from "@/components/inputs/tab-input";
import Input from "@/components/inputs/input";
import DateInputMui from "@/components/inputs/date-input-mui";
import InputMui from "@/components/inputs/input-mui";
import { Height, Weight } from "@/components/icons";
import { suffixHandler } from "@/validator/suffixHandler";
import Button from "@/components/buttons/button";
import { PhotoPath } from "@/redux/ApiConfig";

const EditChild = () => {
  const { data: selectedChild } = useGetCurrentchildQuery(undefined);
  const [editChild, { data, isLoading, error, isSuccess }] =
    useEditChildMutation();
  const { controller, displayError } = new UpdateChildValidation();

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

  useEffect(() => {
    if (selectedChild) {
      reset({
        name: selectedChild?.name ?? "",
        weight: selectedChild?.weight ?? "",
        height: selectedChild?.height ?? "",
        gender: selectedChild?.gender ?? "",
        birthday: selectedChild?.birthday ?? "",
      });
    }
  }, [selectedChild, reset]);

  useEffect(() => {
    if (data) {
      // toast.success("child has been modified successfuly");
      reset();
    }
  }, [data]);

  const onSubmit = async (values: any) =>
    editChild(
      objectToFormData({
        ...values,
        photo: values.photo?.[0],
        weight: String(values?.weight ?? ""),
        height: String(values?.height ?? ""),
      })
    );

  return (
    <div className="w-full">
      <div className="wrapper w-full flex flex-col gap-y-[24px]">
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
                defaultValue: selectedChild?.photo
                ? PhotoPath(selectedChild.photo)
                : undefined,
              }}
              inputProps={{
                ...register("photo"),
                accept: "image/jpg",
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
          <div className="flex flex-col gap-y-1">
            <Button type="submit" text="Update" isLoading={isLoading} />
            <button
              type="button"
              className="text-center text-[#FF5135] text-[16px] font-[700] leading-[19.84px] p-[16px]"
            >
              Remove
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChild;
