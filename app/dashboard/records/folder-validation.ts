"use client";

import { YupValidation } from "@/validator/Validation/YupValidation";
import { object, string } from "yup";

export class RecordsFolderValidation extends YupValidation {
  constructor() {
    super();
  }

  form = {
    folderName: "",
    directory: "",
  };

  schema = object().shape({
    folderName: string().required("Folder name is required"),
    directory: string().nullable(),
  });
}
