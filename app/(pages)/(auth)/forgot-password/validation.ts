"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class ForgotPasswordValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    email: "",
  };

  schema = object().shape({
    email: string()
      .email("email should be in email form")
      .required("Email is required"),
  });
}
