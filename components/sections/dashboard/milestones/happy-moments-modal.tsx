import OutlineButton from "@/components/buttons/OutlineButton";
import Button from "@/components/buttons/button";
import dayjs from "dayjs";

const HappyMomentsModal = (
  <>
    <input type="checkbox" id="happy-moments-btn" className="modal-toggle" />
    <div className="modal" role="dialog">
      <div className="modal-box w-[400px] max-w-[400px]">
        <label
          className="modal-backdrop text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          htmlFor="happy-moments-btn"
        >
          ✕
        </label>

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
                Adam has achieved the milestone on{" "}
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
                onClick() {},
              }}
            />
            <OutlineButton
              text="Check other milestones"
              className="w-full"
              options={{
                onClick() {
                  document.getElementById("happy-moments-btn")?.click();
                },
              }}
            />
          </div>
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="growth-modal-btn">
        close
      </label>
    </div>
    <input type="file" className="hidden" />
  </>
);
export default HappyMomentsModal;
