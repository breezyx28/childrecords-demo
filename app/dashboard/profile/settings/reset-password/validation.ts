"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import * as yup from "yup"; // Ensure you import yup properly

export class ResetPasswordValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    old_password: "",
    new_password: "",
  };

  schema = yup.object().shape({
    old_password: yup
      .string()
      .min(8, "minimum length of old password is 8 characters")
      .required("old password is required"),
    new_password: yup
      .string()
      .min(8, "minimum length of new password is 8 characters")
      .required("new password is required"),
  });
}
