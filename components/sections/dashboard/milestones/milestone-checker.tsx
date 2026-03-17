import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import Dialog from "@/components/modals/dialog";
import { generateSlug } from "@/helper/string-to-slug";
import {
  useMarkMilestoneCompletedMutation,
  useUploadMomentPhotosMutation,
} from "@/redux/endpoints/milestones";
import React, { ChangeEvent } from "react";
import MilestoneMomentImg from "./milestone-moment-img";
import objectToFormData from "@/helper/object-to-formdata";
import { useCountdown } from "@/hooks/useCountdown";
import dayjs from "dayjs";
import { useGetCurrentchildQuery } from "@/redux/endpoints/child";

type TMilestoneCheckerProps = {
  name: string;
  milestoneId: number;
  checked?: boolean;
  onCheckedChange?: (milestoneId: number, checked: boolean) => void;
};

const MilestoneChecker = ({
  name,
  milestoneId,
  checked,
  onCheckedChange,
}: TMilestoneCheckerProps) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [isChecked, setIsChecked] = React.useState(false);

  const [
    markMilestoneCompleted,
    { data, isLoading: LoadingMarkMilestoneComplete, isSuccess, error },
  ] = useMarkMilestoneCompletedMutation();
  const { data: currentChild, isLoading } = useGetCurrentchildQuery(undefined);

  const [
    uploadMoment,
    {
      data: uplodedMomentData,
      isLoading: UploadingMomentLoading,
      error: UploadMomentError,
    },
  ] = useUploadMomentPhotosMutation();

  const handleMarkCompleted = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    onCheckedChange?.(milestoneId, isChecked);
    markMilestoneCompleted({
      milestone_id: milestoneId,
      completed: isChecked,
    });
  };

  React.useEffect(() => {
    if (isSuccess && isChecked) {
      document.getElementById(`happy-moments-btn-${milestoneId}`)?.click();
    }
  }, [isSuccess, isChecked]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedFiles(validFiles);
    }
  };

  React.useEffect(() => {
    if (selectedFiles?.length > 0) {
      document.getElementById(`happy-moments-btn-${milestoneId}`)?.click();
      document
        .getElementById(`moments-uploaded-images-btn-${milestoneId}`)
        ?.click();
    }
  }, [selectedFiles]);

  React.useEffect(() => {
    if (uplodedMomentData) {
      startCount();
    }
    if (UploadMomentError) {
      console.log("UploadMomentError: ", UploadMomentError);
    }
  }, [uplodedMomentData, UploadMomentError]);

  const { count, onFinish, startCount, isRunning } = useCountdown(3);

  React.useEffect(() => {
    if (onFinish) {
      document
        .getElementById(`moments-uploaded-images-btn-${milestoneId}`)
        ?.click();
    }
  }, [count, onFinish]);

  return (
    <>
      <input
        id={`${milestoneId}-${generateSlug(name)}`}
        type="checkbox"
        disabled={LoadingMarkMilestoneComplete}
        onChange={handleMarkCompleted}
        defaultChecked={checked}
        className="checkbox border-2 border-[#AFB3BA] [--chkbg:#394CFF] [--chkfg:#fff] checked:border-primary-600 checkbox-md"
      />

      <Dialog id={`happy-moments-btn-${milestoneId}`} closeBtn>
        <div className="happy-moments-btn-content flex flex-col w-full gap-y-[32px]">
          <div className="w-full flex flex-col gap-y-[12px]">
            <div className="text-center text-[32px] font-[800] leading-[43.65px]">
              🥳
            </div>
            <div className="text-center text-black text-[24px] font-[800] leading-[32.74px]">
              Congratulations
            </div>
            <div className="flex flex-col text-center">
              <p className="text-[#585A5D] text-[16px] font-[700] leading-[19.84px]">
                {currentChild?.name ?? "---"} has achieved the milestone on{" "}
              </p>
              <span className="text-black text-[16px] font-[700] leading-[19.84px]">
                {dayjs().format("D MMMM YYYY")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <Button
              text="Upload moment photo"
              className="w-full text-center"
              buttonAttributes={{
                onClick() {
                  document
                    .getElementById(
                      `upload-moments-photos-input-${milestoneId}`
                    )
                    ?.click();
                },
              }}
            />
            <OutlineButton
              text="Check other milestones"
              className="w-full"
              options={{
                onClick() {
                  document
                    .getElementById(`happy-moments-btn-${milestoneId}`)
                    ?.click();
                },
              }}
            />
          </div>
          <input
            id={`upload-moments-photos-input-${milestoneId}`}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </Dialog>
      <Dialog id={`moments-uploaded-images-btn-${milestoneId}`} closeBtn>
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[32px]">
            <div className="w-full flex flex-col gap-y-[12px]">
              <div className="text-center text-black text-[24px] font-[800] leading-[32.74px]">
                Upload moment photos 💕
              </div>
              <div className="text-center">
                <p className="text-[#585A5D] text-[16px] font-[700] leading-[19.84px]">
                  Adam started to crawl{" "}
                </p>
                <p className="text-black text-[16px] font-[700] leading-[19.84px]">
                  8 August 2024
                </p>
              </div>
            </div>
            {uplodedMomentData && (
              <span className="flex items-center px-[12px] py-[8px] bg-green-100 text-gray-500 text-center text-[14px] capitalize font-[600] rounded-[8px]">
                Moments has been uploaded successfully{" "}
                <span className="text-gray-600 font-[800] italic">
                  close in: {count}
                </span>
              </span>
            )}
            <div className="img w-full h-full flex items-center justify-center">
              <div className="relative w-[200px] h-[200px]">
                {selectedFiles &&
                  selectedFiles?.map((item: any, index: number) => {
                    const previewUrl = URL.createObjectURL(item);
                    return (
                      <div
                        key={index}
                        className={`absolute w-full h-full left-[${
                          index + 2
                        }0px] top-[-${index + 2}0px]`}
                      >
                        <MilestoneMomentImg
                          src={previewUrl}
                          onLoad={() => URL.revokeObjectURL(previewUrl)}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <Button
            isLoading={UploadingMomentLoading}
            text="Upload"
            className="w-full text-center"
            buttonAttributes={{
              onClick() {
                uploadMoment(
                  objectToFormData({
                    milestone_id: milestoneId,
                    photos: selectedFiles,
                  })
                );
              },
            }}
          />
        </div>
      </Dialog>
    </>
  );
};

export default MilestoneChecker;
