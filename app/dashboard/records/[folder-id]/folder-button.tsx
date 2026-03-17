import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Loading02 } from "untitledui-js";

type ButtonProps = {
  text: string;
  className?: string;
  buttonAttributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  isLoading?: boolean;
};

const FolderButton = ({
  text,
  buttonAttributes,
  className,
  isLoading,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={isLoading}
      className={twMerge(
        "w-full h-full py-[14px] text-white bg-primary-600 text-[13px] rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-primary-700 hover:shadow-lg leading-[19.84px]",
        className
      )}
      style={{
        border: "2px solid",
        borderImageSource:
          "linear-gradient(180deg, rgba(171, 179, 255, 0.5) 0%, rgba(183, 190, 255, 0.12) 100%)",
        boxShadow: "0px -2px 4px 0px #0011ADA6 inset",
      }}
      {...buttonAttributes}
    >
      <span className="block">
        {isLoading ? (
          <Loading02
            stroke={"white"}
            className={"w-[21px] h-[21px] animate-spin"}
          />
        ) : (
          <p className="min-w-[100px]">{text}</p>
        )}
      </span>
    </button>
  );
};

export default FolderButton;
