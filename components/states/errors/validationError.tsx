import React, { ReactElement } from "react";
import { AlertCircle } from "untitledui-js";

type ValidationProps = {
  text: string | any;
  icon?: ReactElement;
};

const ValidationError = ({ text, icon }: ValidationProps) => {
  return (
    <div className="flex items-center gap-x-[4px] pt-[4px]">
      <AlertCircle stroke={"#FF5135"} width={20} height={21} />
      <p className="text-error-600 text-[14px] font-normal leading-[20.72px]">
        {text}
      </p>
    </div>
  );
};

export default ValidationError;
