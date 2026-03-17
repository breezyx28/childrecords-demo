import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Input from "../inputs/input";
import Button from "./button";
import { Height, Weight } from "../icons";

type ButtonProps = {
  href?: string;
  text: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  buttonAttributes?: HTMLAttributes<HTMLLabelElement>;
};

const ModalButton = ({ text, className, buttonAttributes }: ButtonProps) => {
  return (
    <>
      <label
        htmlFor="growth-modal-btn"
        className={twMerge(
          "md:px-[48px] px-[24px] md:py-[16px] py-[10px] text-white bg-primary-600 md:text-[16px] text-[14px] rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-primary-700 hover:shadow-lg", // Added hover animation
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
        {text}
      </label>
      {ButtonModal}
    </>
  );
};
const ButtonModal = (
  <>
    <input type="checkbox" id="growth-modal-btn" className="modal-toggle" />
    <div className="modal" role="dialog">
      <div className="modal-box w-[400px] max-w-[400px]">
        <label
          className="modal-backdrop text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          htmlFor="growth-modal-btn"
        >
          ✕
        </label>

        <div className="growth-modal-btn-content flex flex-col w-full gap-y-[24px]">
          <h5 className="text-center text-black text-[24px] font-[800] leading-[32.74px]">
            Log weight & Height
          </h5>
          <div className="flex flex-col gap-y-[12px]">
            <form method="POST" className="flex flex-col gap-y-[8px]">
              <div className="login-inputs flex flex-col gap-y-[16px]">
                <Input
                  option={{
                    type: "date",
                    placeholder: "Birthday",
                    icon: "",
                  }}
                />
                <Input
                  inputProps={{
                    inputMode: "numeric",
                  }}
                  option={{
                    type: "text",
                    placeholder: "Weight",
                    icon: <Weight />,
                  }}
                />
                <Input
                  inputProps={{
                    inputMode: "numeric",
                  }}
                  option={{
                    type: "text",
                    placeholder: "Height",
                    icon: <Height />,
                  }}
                />
              </div>
              <div className="submit-btn flex flex-col gap-y-[24px]">
                <Button text="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="growth-modal-btn">
        close
      </label>
    </div>
  </>
);
export default ModalButton;
