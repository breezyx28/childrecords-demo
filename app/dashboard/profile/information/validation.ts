"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, mixed } from "yup";

export class UpdateProfileImageValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    photo: "",
  };

  schema = object().shape({
    photo: mixed()
      .required("Please select an image.")
      .test("fileFormat", "Invalid file format.", (value: any) => {
        if (!value[0]) return true;
        console.log("image-format: ", value?.[0]?.type);

        return (
          value?.[0]?.type &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value?.[0]?.type)
        );
      })
      .test(
        "fileSize",
        "File size exceeds the limit of 2 MB.",
        (value: any) => {
          if (!value?.[0]) return true;
          return value?.[0] && value?.[0]?.size <= 2 * 1024 * 1024;
        }
      ),
  });
}
