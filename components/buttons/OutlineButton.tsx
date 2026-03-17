import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import styles from "@/styles/OutlineButton.module.css";
import { Link } from "react-router-dom";
import { Loading02 } from "untitledui-js";

type ButtonProps = {
  href?: string;
  text: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  options?: ButtonHTMLAttributes<HTMLButtonElement>;
  isLoading?: boolean;
  disabled?: boolean;
};

const OutlineButton = ({
  href = "#",
  text,
  className,
  type = "button",
  options,
  isLoading,
  disabled,
}: ButtonProps) => {
  return href !== "#" ? (
    <Link to={href ?? "/"}>
      <button
        disabled={isLoading || disabled}
        type={type}
        className={twMerge(
          styles.outlineBtn,
          "flex items-center justify-center gap-x-[8px]", // Center content and icon
          className
        )}
        {...options}
      >
        {isLoading ? (
          <Loading02
            stroke={"white"}
            className={"w-[21px] h-[21px] animate-spin"}
          />
        ) : (
          text
        )}
      </button>
    </Link>
  ) : (
    <button
      disabled={isLoading}
      type={type}
      className={twMerge(
        styles.outlineBtn,
        "flex items-center justify-center gap-x-[8px]", // Center content and icon
        className,

        isLoading && "!bg-[#E2E6ED] !text-[#83868B]"
      )}
      {...options}
    >
      {isLoading ? (
        <Loading02
          stroke={"white"}
          className={"w-[21px] h-[21px] animate-spin"}
        />
      ) : (
        text
      )}
    </button>
  );
};

export default OutlineButton;
