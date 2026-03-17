"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, boolean, date } from "yup";

export class UpdateRminderValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    title: "",
    date: "",
    type: "",
    repeat: false,
  };

  schema = object().shape({
    title: string().required("title is required"),
    type: string().required("Type is required"),
    date: string().required("Date is required"),
    repeat: boolean().required("repeat is required"),
    time: string().nullable(),
  });
}
