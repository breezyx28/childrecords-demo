"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class PartnerVisitorValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    fullname: "",
    phone: "",
    email: "",
    partner: "",
  };

  schema = object().shape({
    fullname: string().required("Message is required"),
    partner: string().required("Partner name is required"),
    phone: string()
      .required("Phone is required")
      .matches(
        /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/,
        "Please enter a valid phone number"
      )
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
    email: string()
      .email("Email should be in a valid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email should have a valid domain"
      )
      .required("Email is required"),
  });
}
