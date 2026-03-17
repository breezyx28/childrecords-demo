"use client";

import { numberWithSuffix } from "@/validator/suffixValidator";
import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, number, mixed } from "yup";

export class UpdateChildValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    photo: "",
    name: "",
    gender: "",
    birthday: "",
    weight: "",
    height: "",
  };

  schema = object().shape({
    name: string()
      .matches(
        /^[a-zA-Z\u0600-\u06FF\s]+$/,
        "full name should only contains letters"
      )
      .required("Full name is required"),
    gender: string()
      .required("Gender is required")
      .oneOf(["boy", "girl"], "Gender must be either 'boy' or 'girl'"),
    birthday: string()
      .required("Birthday is required")
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "Birthday must be in the format dd/mm/yyyy"
      ),
    height: numberWithSuffix("cm", 1, 250, "height"),
    weight: numberWithSuffix("kg", 1, 500, "Weight"),
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
