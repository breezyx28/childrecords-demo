import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import RemoveButton from "@/components/buttons/remove-button";
import Dialog from "@/components/modals/dialog";
import { useDeleteReminderMutation } from "@/redux/endpoints/reminder";
import React from "react";

const RemoveReminderModal = ({
  id,
  refetchAllReminders,
}: {
  id: number | string;
  refetchAllReminders: (...args: any) => any;
}) => {
  const [deleteReminder, { data, isLoading }] = useDeleteReminderMutation();
  return (
    <Dialog closeBtn id={`delete-reminder-${id}`}>
      <div className="w-full flex flex-col gap-y-[32px]">
        <div className="flex flex-col gap-y-[12px] text-center">
          <h1 className="text-black text-[24px] font-[800] leading-[32.74px]">
            Delete reminder
          </h1>
          <p className="text-[#585A5D] text-[16px] font-[700] leading-[19.84px]">
            Are you you want to delete this reminder?
          </p>
        </div>
        <div className="flex flex-col gap-y-[12px]">
          <RemoveButton
            text="Delete"
            isLoading={isLoading}
            className="hover:bg-error-600 hover:text-white bg-transparent border-error-600 text-error-600 flex items-center justify-center"
            buttonAttributes={{
              onClick() {
                deleteReminder({ reminder_id: id as any }).then((response) => {
                  document.getElementById(`delete-reminder-${id}`)?.click();
                  refetchAllReminders();
                });
              },
            }}
          />
          <OutlineButton
            text="Cancel"
            className="w-full"
            options={{
              onClick: () =>
                document.getElementById(`delete-reminder-${id}`)?.click(),
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default RemoveReminderModal;
