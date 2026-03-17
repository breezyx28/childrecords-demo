"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class NewsLetterValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    email: "",
  };

  schema = object().shape({
    email: string()
      .email("Email should be in a valid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email should have a valid domain"
      )
      .required("Email is required"),
  });
}
