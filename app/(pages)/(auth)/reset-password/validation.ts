"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, ref, string } from "yup";

export class ResetPasswordValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  schema = object().shape({
    email: string()
      .email("email should be in email form")
      .required("Email is required"),
    password: string()
      .min(8, "minimum length of password is 8 charecters")
      .required("password is required"),
    password_confirmation: string()
      .oneOf(
        [ref("password"), undefined],
        "password confirmation must match password"
      )
      .required("password confirmation is required"),
  });
}
