"use client";

import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import { Delete } from "@/components/icons";
import Dialog from "@/components/modals/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteFolderMutation } from "@/redux/endpoints/records";
import React from "react";
import { DotsVertical } from "untitledui-js";

type FolderOptionsMenuProps = {
  id?: number;
};

export function FolderOptions({ id }: FolderOptionsMenuProps) {
  const [
    deleteFolder,
    { data: deleteFolderData, isLoading: deletingFolderIsLoading },
  ] = useDeleteFolderMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none">
        <DotsVertical
          size="16"
          className="text-black cursor-pointer focus:outline-none focus:ring-0 focus:border-none"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[160px]">
        <DropdownMenuGroup className="cursor-pointer">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              document.getElementById(`delete-folder-${id}`)?.click()
            }
          >
            <Delete className="!w-[26px] !h-[24px]" /> Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      <Dialog closeBtn id={`delete-folder-${id}`}>
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[12px] text-center">
            <h1 className="text-black text-[24px] font-[800] leading-[32.74px]">
              Delete Folder
            </h1>
            <p className="text-[#585A5D] text-[16px] font-[700] leading-[19.84px]">
              Are you you want to delete this folder?
            </p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <Button
              isLoading={deletingFolderIsLoading}
              text="Delete"
              buttonAttributes={{
                onClick() {
                  deleteFolder({ folder_id: id as any }).then((response) => {
                    document.getElementById(`delete-folder-${id}`)?.click();
                  });
                },
              }}
            />
            <OutlineButton
              text="Cancel"
              className="w-full"
              options={{
                onClick: () =>
                  document.getElementById(`delete-folder-${id}`)?.click(),
              }}
            />
          </div>
        </div>
      </Dialog>
    </DropdownMenu>
  );
}
