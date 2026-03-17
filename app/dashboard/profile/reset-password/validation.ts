"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class ResetPasswordValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    old_password: "",
    reset_password: "",
  };

  schema = object().shape({
    old_password: string()
      .min(8, "minimum length of old password is 8 charecters")
      .required("old password is required"),
    reset_password: string()
      .min(8, "minimum length of new password is 8 charecters")
      .required("new password is required"),
  });
}
