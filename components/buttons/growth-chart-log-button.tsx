import { HTMLAttributes, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./button";
import { Height, Weight } from "../icons";
import { useLogWeightAndHeightMutation } from "@/redux/endpoints/growth-chart";
import DateInputMui from "../inputs/date-input-mui";
import { LogHeightWeightValidation } from "@/app/dashboard/growth-chart/validation";
import Alert from "../alerts";
import { toast } from "sonner";
import InputMui from "../inputs/input-mui";
import { suffixHandler } from "@/validator/suffixHandler";

type ButtonProps = {
  href?: string;
  text: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  buttonAttributes?: HTMLAttributes<HTMLButtonElement>;
  disableStyle?: boolean;
};

const GrowthChartLogModalButton = ({
  text,
  className,
  buttonAttributes,
  disableStyle,
}: ButtonProps) => {
  return (
    <>
      <button
        type={"button"}
        className={twMerge(
          "md:px-[48px] px-[24px] md:py-[16px] py-[10px] text-white bg-primary-600 md:text-[16px] text-[14px] rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-primary-700 hover:shadow-lg", // Added hover animation
          className
        )}
        style={
          disableStyle
            ? {}
            : {
                border: "2px solid",
                borderImageSource:
                  "linear-gradient(180deg, rgba(171, 179, 255, 0.5) 0%, rgba(183, 190, 255, 0.12) 100%)",
                boxShadow: "0px -2px 4px 0px #0011ADA6 inset",
              }
        }
        onClick={() => {
          document.getElementById("growth-modal-btn")?.click();
        }}
        {...buttonAttributes}
      >
        {text}
      </button>
      {<ButtonModal />}
    </>
  );
};
const ButtonModal = () => {
  const [submitLog, { data, isLoading, error }] =
    useLogWeightAndHeightMutation();
  const { controller, displayError } = new LogHeightWeightValidation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = controller();

  useEffect(() => {
    if (error) {
      displayError(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // toast.success("Successfully added");
      document.getElementById("growth-modal-btn")?.click();
      reset();
    }
  }, [data]);

  const onSubmit = async (values: any) =>
    submitLog({
      ...values,
      weight: `${values.weight} kg`,
      height: `${values.height} cm`,
    });
  return (
    <>
      <input type="checkbox" id="growth-modal-btn" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box md:w-[400px] w-auto max-w-[400px]">
          <label
            className="modal-backdrop text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            htmlFor="growth-modal-btn"
          >
            ✕
          </label>

          <div className="growth-modal-btn-content flex flex-col w-full gap-y-[24px]">
            <h5 className="text-center text-black md:text-[24px] text-[22px] font-[800] leading-[32.74px]">
              Log weight & Height
            </h5>
            <div className="flex flex-col gap-y-[12px]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-[8px]"
              >
                {/* @ts-ignore */}
                {error && (
                  <Alert
                    type="error"
                    // @ts-ignore
                    message={error?.data?.message}
                    error={error}
                  />
                )}
                <div className="login-inputs flex flex-col gap-y-[16px]">
                  <DateInputMui
                    name="date"
                    setValue={setValue}
                    option={{
                      placeholder: "Log date",
                      error: errors?.date?.message,
                    }}
                  />
                  <InputMui
                    inputProps={{
                      inputMode: "numeric",
                      ...register("weight", {
                        onChange: (e) =>
                          suffixHandler(e, "weight", "kg", setValue),
                      }),
                      id: "weight",
                    }}
                    option={{
                      type: "text",
                      placeholder: "Weight",
                      icon: <Weight />,
                      error: errors?.weight?.message,
                    }}
                  />
                  <InputMui
                    inputProps={{
                      inputMode: "numeric",
                      ...register("height", {
                        onChange: (e) =>
                          suffixHandler(e, "height", "cm", setValue),
                      }),
                      id: "height",
                    }}
                    option={{
                      type: "text",
                      placeholder: "Height",
                      icon: <Height />,
                      error: errors?.height?.message,
                    }}
                  />
                </div>
                <div className="submit-btn flex flex-col gap-y-[24px]">
                  <Button isLoading={isLoading} type="submit" text="Submit" />
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
};
export default GrowthChartLogModalButton;
