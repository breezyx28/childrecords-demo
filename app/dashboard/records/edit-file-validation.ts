"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class RecordsEditFileValidation extends YupValidation {
  constructor() {
    super();
  }
  filename = "";
  description = "";

  schema = object().shape({
    filename: string().nullable(),
    description: string().nullable(),
  });
}
