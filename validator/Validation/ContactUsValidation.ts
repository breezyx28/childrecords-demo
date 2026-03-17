"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class ContactUsValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    phone: "",
    message: "",
  };

  schema = object().shape({
    phone: string()
      .required("Phone is required")
      .matches(
        /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/,
        "Please enter a valid phone number"
      )
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
    message: string().required("Message is required"),
  });
}
