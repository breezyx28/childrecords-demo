"use client";

import React from "react";
import { Age, ArrowDown, Height, Weight } from "@/components/icons";
import "@/styles/components/switch-input.css";
import {
  useGetCurrentchildQuery,
  useGetParentChildrenQuery,
} from "@/redux/endpoints/child";
import SwitchChildSkeleton from "@/components/skeletons/switch-child";
import { ChildThumb } from "@/components/cards/switch-child/child-thumbnail";
import { SwitchChildModal } from "../child/switch-child-modal";

function ageFromBirthday(birthday: string | undefined): string {
  if (!birthday) return "—";
  const d = new Date(birthday);
  if (Number.isNaN(d.getTime())) return "—";
  const now = new Date();
  const months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${years}y ${m}mo` : `${years}y`;
}

const SwitchChild = () => {
  const { data: selectedChild, isFetching } = useGetCurrentchildQuery(undefined);
  useGetParentChildrenQuery(undefined); // keep cache for modal list

  // API returns age/weight/height as display strings (e.g. "2 years 3 months", "12 KG", "85 CM")
  const displayAge = selectedChild?.age ?? (selectedChild?.birthday && typeof selectedChild.birthday === "string" && selectedChild.birthday.length === 10 ? ageFromBirthday(selectedChild.birthday) : null) ?? "—";
  const displayWeight = selectedChild?.weight != null && selectedChild?.weight !== "" ? String(selectedChild.weight).trim() : "—";
  const displayHeight = selectedChild?.height != null && selectedChild?.height !== "" ? String(selectedChild.height).trim() : "—";

  return isFetching ? (
    <SwitchChildSkeleton />
  ) : (
    <>
      <div className="w-full md:p-[24px] p-[16px] rounded-[24px] border border-[#E2E6ED]">
        <div className="wrapper w-full flex justify-between md:flex-row flex-col md:items-center items-start md:gap-x-[21px] gap-[16px]">
          <div className="child-profile md:w-auto w-full">
            <div className="md:px-[20px] px-[0px] flex items-center gap-x-[16px]">
              <ChildThumb
                thumb={selectedChild?.photo}
              />
              <span className="child-name text-black text-[20px] font-[800] leading-[27.28px]">
                Hi {selectedChild?.name} 👋
              </span>
            </div>
          </div>
          <div className="child-info text-[#83868B] md:w-auto w-full flex md:flex-row flex-col items-center md:gap-[40px] gap-[24px]">
            <div className="w-full divide divide-x grid grid-cols-3">
              <div className="child-switch-prop child-age">
                <div className="flex items-center gap-x-[8px]">
                  <Age />
                  <span className="text-[14px] font-[700] leading-[18.2px]">
                    Age
                  </span>
                </div>
                <p className="text-black text-[16px] font-[800] leading-[21.82px]">
                  {displayAge}
                </p>
              </div>
              <div className="child-switch-prop child-weight">
                <div className="flex items-center gap-x-[8px]">
                  <Weight />
                  <span className="text-[14px] font-[700] leading-[18.2px]">
                    Weight
                  </span>
                </div>
                <p className="text-black text-[16px] font-[800] leading-[21.82px]">
                  {displayWeight}
                </p>
              </div>
              <div className="child-switch-prop child-height">
                <div className="flex items-center gap-x-[8px]">
                  <Height />
                  <span className="text-[14px] font-[700] leading-[18.2px]">
                    Height
                  </span>
                </div>
                <p className="text-black text-[16px] font-[800] leading-[21.82px]">
                  {displayHeight}
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto rounded-full bg-primary-100">
              <label
                htmlFor="switch-child-modal"
                className="switch-wrapper flex items-center justify-center gap-x-[8px] p-[16px] cursor-pointer"
              >
                <span className="text-primary-600 text-[16px] font-[700] leading-[19.84px]">
                  Switch
                </span>
                <span className="">
                  <ArrowDown className="text-primary-600" />
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* {<SwitchModal data={children} />} */}
      </div>
      <SwitchChildModal />
    </>
  );
};

// export const SwitchModal = ({ data }: { data: ParentChildrenProps }) => (
//   <>
//     <input type="checkbox" id="switch-child-modal" className="modal-toggle" />
//     <div className="modal" role="dialog">
//       <div className="modal-box md:w-[800px] max-w-[800px]">
//         <label
//           className="modal-backdrop text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//           htmlFor="switch-child-modal"
//         >
//           ✕
//         </label>

//         <div className="switch-child-modal-content flex flex-col w-full gap-y-[24px]">
//           <div className="flex mt-[1rem] items-center justify-between">
//             <h5 className="text-black text-[24px] font-[800] leading-[32.74px]">
//               Select child
//             </h5>
//             <div className="">
//               <Button
//                 href="/add-child"
//                 text="Add child"
//                 className="md:px-[20px] md:py-[14px]"
//               />
//             </div>
//           </div>
//           <div>
//             <form className="flex flex-col gap-y-[12px]">
//               {data?.map((item) => (
//                 <SwitchChildCard key={item?.id} childData={item} />
//               ))}
//             </form>
//           </div>
//         </div>
//       </div>
//       <label className="modal-backdrop" htmlFor="switch-child-modal">
//         close
//       </label>
//     </div>
//   </>
// );

export default SwitchChild;
