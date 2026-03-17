"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, boolean } from "yup";

export class AddReminderValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    title: "",
    date: "",
    type: "",
    repeat: false,
    repeat_schedule: "",
  };

  schema = object().shape({
    title: string().required("Title is required"),
    type: string().required("Type is required"),
    date: string().required("Date is required"),
    repeat: boolean().required("Repeat is required"),
    repeat_schedule: string().nullable(),
  });
}
