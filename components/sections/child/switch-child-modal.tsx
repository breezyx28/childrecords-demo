"use client";

import Button from "@/components/buttons/button";
import SwitchChildCard from "@/components/cards/switch-child";
import DisabledSwitchChildCard from "@/components/cards/switch-child/disabled-card";
import {
  allowedNumberOfChildrens,
  plansChildrenRestrictions,
} from "@/config/plan-module/plans-restrictions";
import { useUserContext } from "@/context/UserContext";
import { useGetParentChildrenQuery } from "@/redux/endpoints/child";
import { useNavigate } from "react-router-dom";
import React, { useMemo } from "react";
import { Lock } from "lucide-react";

export const SwitchChildModal = () => {
  const navigate = useNavigate();
  const { data: children } = useGetParentChildrenQuery({});

  const { userInfo: myInfo, loading } = useUserContext();

  const isRestricted = plansChildrenRestrictions(myInfo as any);

  const allowedChildrens = useMemo(() => {
    if (!myInfo) return 0;
    return allowedNumberOfChildrens(myInfo);
  }, [myInfo]);

  return (
    <>
      <input type="checkbox" id="switch-child-modal" className="modal-toggle"/>
      <div className="modal" role="dialog">
        <div className="modal-box md:w-[800px] max-w-[800px]">
          <label
            className="modal-backdrop text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            htmlFor="switch-child-modal"
          >
            ✕
          </label>
          <div className="switch-child-modal-content flex flex-col w-full gap-y-[24px]">
            <div className="flex mt-[1rem] items-center justify-between">
              <h5 className="text-black text-[24px] font-[800] leading-[32.74px]">
                Select child
              </h5>
              <div className="">
                <Button
                  href="#"
                  disabled={loading}
                  isLoading={loading}
                  text={isRestricted ? "Upgrade Plan" : "Add child"}
                  icon={
                    isRestricted ? (
                      <Lock size={20} className="text-white" />
                    ) : (
                      ""
                    )
                  }
                  className="md:px-[20px] md:py-[14px]"
                  buttonAttributes={{
                    onClick(e) {
                      if (isRestricted) {
                        document.getElementById("upgrade-dialog")?.click();
                        return;
                      }
                      e.preventDefault();
                      navigate("/add-child");
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <form className="flex flex-col gap-y-[12px]">
                {children?.map((item: any, index: number) => {
                  if (index + 1 > allowedChildrens) {
                    return (
                      <DisabledSwitchChildCard
                        key={item?.id}
                        childData={item}
                      />
                    );
                  }
                  return <SwitchChildCard key={item?.id} childData={item} />;
                })}
              </form>
            </div>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="switch-child-modal">
          close
        </label>
      </div>
    </>
  );
};
