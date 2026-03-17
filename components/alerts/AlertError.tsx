import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

type AlertErrorType = {
  message: string;
};
const AlertError = ({ message }: AlertErrorType) => {
  return (
    <div className="alert alert-error text-white p-[0.75rem]">
      <div className="flex items-center gap-x-[10px] md:!text-[14px] text-[12px]">
        <ExclamationTriangleIcon />

        <label>{message}</label>
      </div>
    </div>
  );
};

export default AlertError;
