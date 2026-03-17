"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export class YupValidation {
  model: any = null;
  createError: any = null;
  serverErrors: any = null;
  t: any = null;
  lang: any = null;

  constructor() {
    this.model = this;
  }

  controller = () => {
    let formController = useForm({
      resolver: yupResolver(this.model.schema),
      defaultValues: this.model.form,
    });
    this.createError = formController.setError;
    return formController;
  };

  displayError = (server: any, message?: string) => {
    this.serverErrors = server?.data?.errors;

    if (message) {
      console.error("error-message: ", message);

      // alert(`Error: ${message}`);
      return;
    }
    if (server?.errors) {
      console.error("error-server: ", server?.errors);
      // alert(`Error: ${message}`);
      return;
    }

    if (typeof this.serverErrors === "string") {
      // alert(`Error: ${message}`);
    } else {
      for (let key in this.serverErrors) {
        const value = this.serverErrors[key][0];
        this.createError(key, {
          type: "manual",
          message: value,
        });
      }
    }
  };
}
