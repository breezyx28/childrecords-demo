"use client";

import { ProfileImageCam } from "@/components/icons";

import React, { useEffect, useState } from "react";
import { UpdateProfileImageValidation } from "./validation";
import { useUpdateProfilePhotoMutation } from "@/redux/endpoints/account";
import { toast } from "sonner";
import { useMyInfo } from "@/hooks/useMyInfo";
import ValidationError from "@/components/states/errors/validationError";
import { twMerge } from "tailwind-merge";
import objectToFormData from "@/helper/object-to-formdata";
import { PhotoPath } from "@/redux/ApiConfig";

type TProfileImageProps = {
  defaultValue?: string;
};

const ProfileImage = ({ defaultValue }: TProfileImageProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    defaultValue || null
  );

  const [updateProfileImage, { data, isLoading, error, isSuccess }] =
    useUpdateProfilePhotoMutation();
  const { controller, displayError } = new UpdateProfileImageValidation();

  const myInfo = useMyInfo();

  const {
    formState: { errors },
  } = controller();

  useEffect(() => {
    displayError(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      // toast.success("Profile image has been updated successfully");
      // Reset the selected image preview after upload success
      setSelectedImage(null);
    }
  }, [data]);

  useEffect(() => {
    // Display validation errors
    // @ts-ignore
    // if (errors?.photo?.message) toast.error(errors.photo.message);
  }, [errors]);

  useEffect(() => {
    if (selectedImage) {
      // Generate a preview URL for the selected image
      const imageUrl = URL.createObjectURL(selectedImage);
      setPreviewImage(imageUrl);

      // Clean up URL to avoid memory leaks
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [selectedImage]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      updateProfileImage(
        objectToFormData({
          photo: file,
        })
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-1">
      <label
        htmlFor="profile-image"
        className="profile-icon relative cursor-pointer min-w-[50px] min-h-[50px]"
      >
        <span
          className={twMerge(
            "p-[5px] bg-primary-600 rounded-full absolute bottom-[0%] right-[0%]",
            isLoading ? "hidden" : ""
          )}
        >
          <ProfileImageCam className="text-white" />
        </span>

        {/* Spinner or Placeholder */}
        {isLoading ? (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
            <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        ) : null}

        {/* Profile Image or Preview */}
        <img 
          src={
            previewImage ||
            (myInfo?.photo
              ? PhotoPath(myInfo.photo)
              : `/assets/pages/no-image.jpg`)
          }
          width={1000}
          height={1000}
          alt="profile-img"
          className="rounded-full object-cover md:w-[64px] md:h-[64px] w-[50px] h-[50px]"
        />

        {/* File Input */}
        <input
          id="profile-image"
          type="file"
          disabled={isLoading}
          className="hidden"
          accept="image/jpg"
          onChange={onChange}
        />
      </label>

      {error && <ValidationError text={error} />}
    </div>
  );
};

export default ProfileImage;
