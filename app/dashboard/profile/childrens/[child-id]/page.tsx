"use client";

import Button from "@/components/buttons/button";
import { Height, Weight } from "@/components/icons";
import DateInputMui from "@/components/inputs/date-input-mui";
import FileUploadInput from "@/components/inputs/file-upload-input";
import Input from "@/components/inputs/input";
import TabInput from "@/components/inputs/tab-input";
import {
  invalidateChildTags,
  useChildInfoQuery,
  useGetParentChildrenQuery,
} from "@/redux/endpoints/child";
import React, { useEffect } from "react";
import { toast } from "sonner";
import Alert from "@/components/alerts";
import objectToFormData from "@/helper/object-to-formdata";
import { useParams } from "react-router-dom";
import InputMui from "@/components/inputs/input-mui";
import { suffixHandler } from "@/validator/suffixHandler";
import { EditChildValidation } from "./validation";
import RemoveButton from "@/components/buttons/remove-button";
import ProfileLayout from "@/components/layouts/dashboard/profile-layout";
import { useUpdateChildInfoMutation } from "@/redux/endpoints/account";
import { PhotoPath } from "@/redux/ApiConfig";
import DeleteChildModal from "./delete-child-modal";
import FormSkeleton from "@/components/skeletons/inputs/form";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const EditChild = () => {
  const dispatch = useDispatch();
  const { childId } = useParams();

  const { data: childInfo } = useChildInfoQuery({
    id: childId,
  });
  const { refetch } = useGetParentChildrenQuery({});

  const [updateChild, { data, isLoading, error }] =
    useUpdateChildInfoMutation();
  const { controller, displayError } = new EditChildValidation();

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
    if (data) {
      // toast.success("child has been updated successfuly");
      dispatch(invalidateChildTags(["Child"]));
      refetch();
    }
  }, [data]);

  useEffect(() => {
    reset({
      name: childInfo?.name ?? null,
      weight: childInfo?.weight ?? null,
      height: childInfo?.height ?? null,
    });
  }, [childInfo]);

  const onSubmit = async (values: any) => {
    const filteredValues = Object.fromEntries(
      Object.entries({
        ...values,
        photo: values?.photo?.[0] ?? null,
        weight: String(values?.weight ?? "") || null,
        height: String(values?.height ?? "") || null,
      }).filter(([_, value]) => value !== null && value !== undefined)
    );

    updateChild(objectToFormData(filteredValues));
  };
  return (
    <>
      <ProfileLayout
        pages={[
          { href: "/dashboard/profile/childrens", title: "Childs" },
          { href: `/dashboard/profile/childrens/${childId}`, title: "Edit" },
        ]}
      >
        <div className="w-full h-auto my-[2rem]">
          <div className="wrapper w-full flex flex-col gap-y-[24px]">
            {childInfo ? (
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
                  {childInfo?.photo && (
                    <FileUploadInput
                      label="Child photo"
                      option={{
                        error: errors?.photo?.message,
                        defaultValue: PhotoPath(childInfo?.photo),
                      }}
                      inputProps={{
                        ...register("photo"),
                        accept: "image/jpg",
                      }}
                      watch={watch}
                    />
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-[13px]">
                  <TabInput
                    error={errors?.gender?.message}
                    name="gender"
                    defaultValue={childInfo?.gender ?? "boy"}
                    setValue={setValue}
                  />
                  <Input
                    option={{
                      type: "text",
                      placeholder: "Child's name",
                      error: errors.name?.message,
                      focuseState: true,
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
                      defaultDate: childInfo?.birthday,
                    }}
                    name="birthday"
                    setValue={setValue}
                  />
                  <InputMui
                    inputProps={{
                      inputMode: "numeric",
                      ...register("weight", {
                        onChange: (e) =>
                          suffixHandler(e, "weight", "kg", setValue),
                      }),
                      id: "weight",
                      // value: watch("weight"),
                    }}
                    option={{
                      type: "text",
                      placeholder: "Weight",
                      icon: <Weight />,
                      error: errors?.weight?.message,
                      focuseState: true,
                    }}
                  />
                  <Input
                    inputProps={{
                      inputMode: "numeric",
                      ...register("height", {
                        onChange: (e) =>
                          suffixHandler(e, "height", "cm", setValue),
                      }),
                      id: "height",
                    }}
                    option={{
                      type: "text",
                      placeholder: "Height",
                      icon: <Height />,
                      error: errors?.height?.message,
                      focuseState: true,
                    }}
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <Button
                    type="submit"
                    text="Update Child"
                    isLoading={isLoading}
                  />
                  <RemoveButton
                    buttonAttributes={{
                      onClick() {
                        document
                          .getElementById(`delete-child-${childId}`)
                          ?.click();
                      },
                    }}
                    type="button"
                  />
                </div>
              </form>
            ) : (
              <FormSkeleton />
            )}
          </div>
          <DeleteChildModal childId={childId as string | number} />
        </div>
      </ProfileLayout>
    </>
  );
};

export default EditChild;
