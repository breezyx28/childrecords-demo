"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, number } from "yup";

export class UpdateAccountValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    fullname: "",
    email: "",
    nationality: "",
  };

  schema = object().shape({
    fullname: string().nullable(),
    email: string().email("email should be in email form").nullable(),
    nationality: string().nullable(),
  });
}
