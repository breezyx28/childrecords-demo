"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, number } from "yup";

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
      .min(8, "minimum length of password is 8 charecters")
      .required("password is required"),
  });
}
