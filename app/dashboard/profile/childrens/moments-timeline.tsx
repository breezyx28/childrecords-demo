import { TimelineIcon } from "@/components/icons";

import React from "react";
import ChildMomentModal from "./childrens-modals/child-moment-modal";
import DeleteMomentModal from "./childrens-modals/delete-moment-modal";
import { PhotoPath } from "@/redux/ApiConfig";

const PLACEHOLDER_IMAGE = "/assets/pages/no-image.jpg";

type TMomentsTimelineProps = {
  data: any;
};

const MomentsTimeline = ({ data }: TMomentsTimelineProps) => {
  return (
    <>
      <ul className="timeline timeline-snap-icon timeline-vertical !items-start">
        <li
          style={
            {
              "--timeline-col-start": "none",
              justifyItems: "unset",
              marginBottom: "24px",
            } as React.CSSProperties
          }
        >
          <div className="timeline-middle !p-[4px]">
            <div className="flex items-center gap-x-[4px]">
              <TimelineIcon />
              <div className="w-[30px] h-[1px] bg-primary-600"></div>
            </div>
          </div>
          <div className="timeline-end !pt-[4px] max-w-full md:w-[450px] w-[calc(100vw-100px)]">
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between">
                {" "}
                <div className="text-black text-[12px] font-[700] leading-[15.6px]">
                  Milestone achieved
                </div>
                <span className="text-[#83868B] text-[12px] font-[600] leading-[15.6px]">
                  {data?.achieved_at}
                </span>
              </div>

              <div className="">
                <div className="text-[16px] font-[800] leading-[21.82px] max-w-[200px]">
                  {data?.name}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="timeline-moments w-full flex items-center gap-x-[12px] max-h-[88px] mt-[16px] overflow-y-auto">
                {data?.photos?.map((item: any, index: number) => (
                  <>
                    <img 
                      key={"moment-" + index}
                      src={item?.photo ? PhotoPath(item.photo) : PLACEHOLDER_IMAGE}
                      width={200}
                      height={200}
                      className="rounded-[12px] w-[88px] h-[88px] object-cover cursor-pointer"
                      alt=""
                      onClick={() =>
                        document
                          .getElementById(
                            `child-moments-display-modal-${item?.id}`
                          )
                          ?.click()
                      }
                    />

                    <ChildMomentModal
                      key={"moment-modal-" + index}
                      id={item?.id}
                      photo={item?.photo}
                    />
                    <DeleteMomentModal
                      key={"moment-delete-modal-" + index}
                      id={item?.id}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
          <hr className="ml-[12px] bg-primary-600 !w-[2px]" />
        </li>
      </ul>
    </>
  );
};

export default MomentsTimeline;
