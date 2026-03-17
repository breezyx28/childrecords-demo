"use client";

import { numberWithSuffix } from "@/validator/suffixValidator";
import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, number, mixed } from "yup";

export class EditChildValidation extends YupValidation {
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
        "Full name should only contain letters."
      )
      .nullable(),
    gender: string()
      .nullable()
      .oneOf(["boy", "girl"], "Gender must be either 'boy' or 'girl'."),
    birthday: string()
      .nullable()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "Birthday must be in the format DD/MM/YYYY."
      ),
    height: numberWithSuffix("cm", 1, 250, "Height"),
    weight: numberWithSuffix("kg", 1, 500, "Weight"),
    photo: mixed()
      .nullable()
      .test("fileFormat", "Invalid file format.", (value: any) => {
        if (!value || !value?.[0]) return true; // Skip if photo is null
        return (
          value?.[0]?.type &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value?.[0]?.type)
        );
      })
      .test(
        "fileSize",
        "File size exceeds the limit of 2 MB.",
        (value: any) => {
          if (!value || !value?.[0]) return true; // Skip if photo is null
          return value?.[0]?.size <= 2 * 1024 * 1024; // Check size if photo exists
        }
      ),
  });
}
