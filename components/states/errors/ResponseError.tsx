import React, { ReactElement } from "react";

type ResponseProps = {
  text: string;
  icon?: ReactElement;
};

const ResponseError = ({ text, icon }: ResponseProps) => {
  return (
    <div className="flex items-center gap-x-[4px] pt-[4px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <path
          d="M9.99984 7.16666V10.5M9.99984 13.8333H10.0082M18.3332 10.5C18.3332 15.1024 14.6022 18.8333 9.99984 18.8333C5.39746 18.8333 1.6665 15.1024 1.6665 10.5C1.6665 5.89762 5.39746 2.16666 9.99984 2.16666C14.6022 2.16666 18.3332 5.89762 18.3332 10.5Z"
          stroke="#FF5135"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-error-600 text-[14px] font-normal leading-[20.72px]">
        {text}
      </p>
    </div>
  );
};

export default ResponseError;
