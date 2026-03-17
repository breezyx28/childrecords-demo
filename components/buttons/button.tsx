import { handleGoogleClickTracking } from "@/utils/google-track-clicks";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Loading02 } from "untitledui-js";

type ButtonProps = {
  href?: string;
  text: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  buttonAttributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: any;
  isLoading?: boolean;
  disabled?: boolean;
};

const Button = ({
  href = "#",
  text,
  className,
  type = "button",
  buttonAttributes,
  icon,
  isLoading,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      onClick={(e) => {
        handleGoogleClickTracking(e, text);
        href !== "#" ? (window.location.href = href) : null;
      }}
      className={twMerge(
        "md:px-[47px] px-[23px] py-[14px] text-white bg-primary-600 md:text-[15px] text-[13px] rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-primary-700 hover:shadow-lg leading-[19.84px] flex items-center justify-center gap-x-[8px]", // Added hover animation
        className,
        disabled && "opacity-50"
      )}
      style={{
        border: "2px solid",
        borderImageSource:
          "linear-gradient(180deg, rgba(171, 179, 255, 0.5) 0%, rgba(183, 190, 255, 0.12) 100%)",
        boxShadow: "0px -2px 4px 0px #0011ADA6 inset",
      }}
      {...buttonAttributes}
    >
      {isLoading ? (
        <Loading02
          stroke={"white"}
          className={"w-[20px] h-[20px] animate-spin"}
        />
      ) : (
        <>
          {icon && <span className="icon-wrapper">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default Button;
