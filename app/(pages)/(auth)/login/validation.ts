"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class LoginValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    email: "",
    password: "",
  };

  schema = object().shape({
    email: string()
      .email("email should be in email form")
      .required("Email is required"),
    password: string()
      .min(1, "Password is required")
      .required("Password is required"),
  });
}
