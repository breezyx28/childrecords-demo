"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class VerifyOtpValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    email: "",
    code: "",
  };

  schema = object().shape({
    email: string()
      .email("email should be in email form")
      .required("Email is required"),
    code: string()
      .matches(/^[a-zA-Z0-9]+$/, "OTP should be 6 digits")
      .required("OTP is required"),
  });
}
