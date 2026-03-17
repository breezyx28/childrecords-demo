import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Loading02 } from "untitledui-js";

type RemoveButtonProps = {
  href?: string;
  text?: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  buttonAttributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: any;
  isLoading?: boolean;
};

const RemoveButton = ({
  text,
  buttonAttributes,
  className,
  href,
  icon,
  isLoading,
  type,
}: RemoveButtonProps) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={() => (window.location.href = href ?? "#")}
      {...buttonAttributes}
      className={twMerge(
        "w-full py-[16px] rounded-full border-2 border-transparent hover:border-error-600 text-center text-error-600 text-[16px] font-[700] leading-[19.84px] ease-in duration-100",
        className
      )}
    >
      {isLoading ? (
        <Loading02
          stroke={"white"}
          className={"w-[21px] h-[21px] animate-spin text-error-600"}
        />
      ) : (
        <>
          {icon && <span className="icon-wrapper">{icon}</span>}
          {text ?? "Remove"}
        </>
      )}
    </button>
  );
};

export default RemoveButton;
