"use client";

import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import Dialog from "@/components/modals/dialog";
import { useDeleteMilestonePhotoMutation } from "@/redux/endpoints/account";
import React from "react";

const DeleteMomentModal = ({ id }: { id: number | string }) => {
  const [deleteMoment, { data, isLoading }] = useDeleteMilestonePhotoMutation();
  return (
    <div>
      <Dialog closeBtn id={`delete-moment-image-${id}`}>
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[12px] text-center">
            <h1 className="text-black text-[24px] font-[800] leading-[32.74px]">
              Delete Image
            </h1>
            <p className="text-[#585A5D] text-[16px] font-[700] leading-[19.84px]">
              Are you want to delete this image?
            </p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <Button
              text="Delete"
              isLoading={isLoading}
              buttonAttributes={{
                onClick() {
                  deleteMoment({ photo_id: id })
                    .then((response) => {
                      document
                        ?.getElementById(`delete-moment-image-${id}`)
                        ?.click();
                    })
                    .catch((err) => console.log("delete-moment-error: ", err));
                },
              }}
            />
            <OutlineButton
              text="Cancel"
              className="w-full"
              options={{
                onClick: () =>
                  document.getElementById(`delete-moment-image-${id}`)?.click(),
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteMomentModal;
