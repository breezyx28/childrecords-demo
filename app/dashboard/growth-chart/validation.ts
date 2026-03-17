"use client";

import { numberWithSuffix } from "@/validator/suffixValidator";
import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, number } from "yup";

export class LogHeightWeightValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    date: "",
    height: "",
    weight: "",
  };

  schema = object().shape({
    date: string()
      .required("Date is required")
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "Date must be in the format dd/mm/yyyy"
      ),

    height: numberWithSuffix("cm", 1, 250, "height", true),
    weight: numberWithSuffix("kg", 1, 500, "Weight", true),
  });
}
