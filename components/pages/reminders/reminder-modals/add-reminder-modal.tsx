import Button from "@/components/buttons/button";
import Input from "@/components/inputs/input";
import AutocompleteInput from "@/components/inputs/select-input";
import Dialog from "@/components/modals/dialog";
import { useAddReminderMutation } from "@/redux/endpoints/reminder";
import React, { useEffect } from "react";
import { AddReminderValidation } from "../validations/add-validation";
import Alert from "@/components/alerts";
import DatetimeInputMui from "@/components/inputs/datetime-input-mui";

const AddReminderModal = ({
  refetchAllReminders,
}: {
  refetchAllReminders: (...args: any) => any;
}) => {
  const [
    addReminder,
    {
      data: addReminderData,
      isLoading: addReminderLoaing,
      error: addReminderErrors,
    },
  ] = useAddReminderMutation();
  const { controller, displayError } = new AddReminderValidation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = controller();

  useEffect(() => {
    if (addReminderErrors) {
      displayError(addReminderErrors);
    }
  }, [addReminderErrors]);

  useEffect(() => {
    if (addReminderData) {
      reset();
      document.getElementById("add-reminder")?.click();
      setTimeout(() => {
        refetchAllReminders();
      }, 2000);
    }
  }, [addReminderData]);

  const onSubmit = async (values: any) => {
    console.log("values: ", values);
    addReminder(values);
  };

  return (
    <Dialog closeBtn id="add-reminder">
      <div className="w-full flex flex-col gap-y-[32px]">
        <div className="flex flex-col gap-y-[24px]">
          <h5 className="text-center text-black text-[24px] font-[800] leading-[32.74px]">
            Create a reminder
          </h5>
          <form
            className="w-full flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* @ts-ignore */}
            {addReminderErrors && (
              <Alert
                type="error"
                message={
                  // @ts-ignore
                  addReminderErrors?.message
                }
                error={addReminderErrors}
              />
            )}
            <div className="flex flex-col gap-y-[12px]">
              <Input
                option={{
                  type: "text",
                  placeholder: "Title",
                  error: errors?.title?.message,
                }}
                inputProps={{
                  ...register("title"),
                }}
              />
              <DatetimeInputMui
                option={{
                  placeholder: "date",
                  icon: "",
                  error: errors?.date?.message,
                }}
                name="date"
                setValue={setValue}
              />
              <AutocompleteInput
                name="type"
                setValue={setValue}
                option={{
                  withSearch: false,
                  placeholder: "Reminder type",
                  className: "w-full",
                  error: errors?.type?.message as string,
                  optionsData: [
                    { text: "Activity", value: "Activity" },
                    { text: "Medicine", value: "Medicine" },
                    { text: "Appointment", value: "Appointment" },
                  ],
                }}
              />

              <div className="w-full">
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <div className="flex items-center gap-x-[8px] text-[#83868B]">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-md !border-2 [--chkbg:theme(colors.primary.600)] [--chkfg:white] checked:border-primary-600"
                        onChange={(e) =>
                          setValue("repeat", e?.currentTarget?.checked)
                        }
                      />
                      <span className="text-[14px] font-[500] leading-[19.84px]">
                        Repeat Reminder
                      </span>
                    </div>
                  </label>
                  {errors?.repeat && (
                    <span className="text-error-600">
                      {/* @ts-ignore */}
                      {errors?.repeat?.message}
                    </span>
                  )}
                </div>
              </div>

              <AutocompleteInput
                name="repeat_schedule"
                setValue={setValue}
                option={{
                  withSearch: false,
                  placeholder: "Repeat",
                  className: "w-full",
                  error: errors?.repeat_schedule?.message as string,
                  optionsData: [
                    { text: "Everyday", value: "daily" },
                    { text: "Weekly", value: "weekly" },
                    { text: "Monthly", value: "monthly" },
                  ],
                }}
              />
            </div>
            <div className="mt-[32px] w-full">
              <Button
                text="Add"
                type="submit"
                className="w-full"
                isLoading={addReminderLoaing}
              />
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default AddReminderModal;
