"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string, mixed } from "yup";

export class RecordsFileValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    filename: "",
    description: "",
    file: "",
    directory: "",
  };

  schema = object().shape({
    filename: string().required("File name is required"),
    description: string().required("File description is required"),
    file: mixed()
      .required("Please select a file.")
      .test("fileFormat", "Invalid file format.", (value: any) => {
        if (!value[0]) return true;
        return (
          value?.[0]?.type && ["application/pdf"].includes(value?.[0]?.type)
        );
      })
      .test(
        "fileSize",
        "File size exceeds the limit of 5 MB.",
        (value: any) => {
          if (!value?.[0]) return true;
          return value?.[0] && value?.[0]?.size <= 5 * 1024 * 1024;
        }
      ),
    directory: string().nullable(),
  });
}
