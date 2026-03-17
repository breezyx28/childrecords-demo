import React from "react";
import AlertError from "./AlertError";
import AlertSuccess from "./AlertSuccess";
import AlertWarn from "./AlertWarn";

interface AlertIF {
  type: "error" | "success" | "warn";
  message: string;
  error?: Record<any, any>;
}

const Alert = ({ type, message, error }: AlertIF) => {
  return (
    <div className="py-[10px]">{SelectAlert({ type, message, error })}</div>
  );
};

let SelectAlert = ({ type, message, error }: AlertIF) => {
  switch (type) {
    case "error":
      if (error?.data?.message && typeof error?.data?.errors === "string") {
        return <AlertError message={error?.data?.errors} />;
      }
      if (error?.data?.message) {
        return <AlertError message={error?.data?.message} />;
      }
      if (error?.message) {
        return <AlertError message={error?.message} />;
      }
      if (error?.error) {
        return <AlertError message={error?.error} />;
      }
      return <AlertError message={"something went wrong"} />;

    case "success":
      return <AlertSuccess message={message} />;
    case "warn":
      return <AlertWarn message={message} />;
  }
};

export default Alert;
