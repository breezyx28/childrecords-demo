"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, number } from "yup";

export class RegisterValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    fullname: "",
    email: "",
    password: "",
    nationality: "",
  };

  schema = object().shape({
    fullname: string()
      .matches(
        /^[a-zA-Z\u0600-\u06FF\s]+$/,
        "full name should only contains letters"
      )
      .required("Full name is required"),
    email: string().email("Invalid email"),
    password: string()
      .min(8, "minimum length of password is 8 charecters")
      .required("password is required"),
    nationality: string().required("Nationality is required"),
  });
}
