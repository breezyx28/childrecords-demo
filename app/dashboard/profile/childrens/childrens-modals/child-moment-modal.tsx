"use client";

import Button from "@/components/buttons/button";
import { Trash } from "@/components/icons";
import Dialog from "@/components/modals/dialog";
import { useDownloadImage } from "@/hooks/useDownload";
import { PhotoPath } from "@/redux/ApiConfig";

import React from "react";
import { Download01 } from "untitledui-js";

const ChildMomentModal = ({
  id,
  photo,
}: {
  id: number | string;
  photo: string | null;
}) => {
  const downloadImage = useDownloadImage();
  const imageSrc = photo ? PhotoPath(photo) : "/assets/pages/no-image.jpg";

  return (
    <div>
      <Dialog
        id={`child-moments-display-modal-${id}`}
        modalClass="relative md:min-w-[80vw] min-w-[95vw] min-h-[80vh] !p-[0px]"
        contentClass="overflow-hidden"
        closeBtn
      >
        <div className="flex flex-col">
          <div className="moment-cover absolute w-full h-full">
            <img 
              src={imageSrc}
              width={1000}
              height={1000}
              alt="moment-image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="moment-modal-buttons absolute bottom-[10%] w-full flex items-center justify-center gap-x-[8px] z-[10]">
            <button
              type="button"
              className="px-[24px] md:py-[16px] py-[11px] bg-white text-error-600 rounded-full hover:scale-[1.1] transition-all"
              onClick={() =>
                document.getElementById(`delete-moment-image-${id}`)?.click()
              }
            >
              <div className="flex items-center gap-x-[8px]">
                <Trash className="w-[20px] h-[20px]" />
                <span className="md:text-[16px] text-[14px] md:font-[700] font-[500] leading-[19.84px]">
                  Remove
                </span>
              </div>
            </button>
            <Button
              text="Download"
              icon={<Download01 size="20" className="text-white" />}
              buttonAttributes={{
                onClick() {
                  downloadImage(imageSrc, `moment-${id}.jpg`);
                },
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ChildMomentModal;
