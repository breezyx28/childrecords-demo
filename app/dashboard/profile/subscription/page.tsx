"use client";

import React from "react";
import SubscriptionTable from "./table";
import SubscriprionPlan from "@/components/cards/subscription/subscriprion-plan";
import Dialog from "@/components/modals/dialog";
import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import { useCancelSubscriptionMutation } from "@/redux/endpoints/subscription";
import { toast } from "sonner";
import { useMyInfo } from "@/hooks/useMyInfo";
import { useDispatch } from "react-redux";
import { profileApi, useGetMyInfoQuery } from "@/redux/endpoints/profile";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/redux/ApiConfig";

const Subscription = () => {
  const navigate = useNavigate();

  const [canceled, setCanceled] = React.useState<boolean>(false);

  const [isCheckboxChecked, setIsCheckboxChecked] =
    React.useState<boolean>(false);

  const [showError, setShowError] = React.useState<boolean>(false);

  const [cancelSubscription, { isLoading }] = useCancelSubscriptionMutation();
  const dispatch = useDispatch();
  const { data: myInfo } = useGetMyInfoQuery(
    {},
    {
      skip: !isAuthenticated(),
    }
  );

  const isSubscribed = myInfo?.subscribed;
  const plan = myInfo?.subscription_plan;

  const handelCancelSbscription = async () => {
    if (!isCheckboxChecked) {
      setShowError(true);
      return;
    }

    let response = null;
    try {
      response = await cancelSubscription({});

      if (response?.data) {
        setCanceled(true);
        document.getElementById("cancel-subscription")?.click();
        // toast.success("Your subscription has been cancelled");
        dispatch(profileApi.util.invalidateTags(["MyInfo"]));
        setTimeout(() => {
          // window.location.href = "/login";
          navigate("/login");
        }, 3000);
      }
      console.log("cancelled-data: ", response);
    } catch (error) {
      setCanceled(true);
      document.getElementById("cancel-subscription")?.click();
      console.error("cancel-subscription-error: ", error);
    }
  };
  return (
    <div className="w-full">
      <p className="py-[1rem] text-black text-[14px] font-[700] leading-[18.2px]">
        Subscription
      </p>
      <div className="flex flex-col gap-y-[16px]">
        <div className="flex flex-col gap-y-[16px]">
          <div className="">
            <SubscriprionPlan />
          </div>
          {isSubscribed && plan !== "trial" && (
            <p className="p-[16px] bg-[#F1F3F6] rounded-[16px] text-[#83868B] text-[12px] font-[700] leading-[15.6px]">
              Your subscription will end on {myInfo?.subscription_ends_at} and
              will automatically renew on {myInfo?.subscription_ends_at}.
            </p>
          )}
          {isSubscribed ? (
            <div className="flex gap-[16px] w-full">
              <button
                type="button"
                className="w-full py-[12px] text-[#83868B] text-[12px] font-[700] leading-[15.6px] border border-[#E9ECF1] rounded-full"
                onClick={() => {
                  document.getElementById("cancel-subscription")?.click();
                }}
              >
                Cancel Subscription
              </button>
              <button
                type="button"
                className="w-full text-center py-[12px] bg-[#EBEDFF] text-primary-600 text-[12px] font-[700] leading-[15.6px] rounded-full"
                onClick={() => {
                  document.getElementById("upgrade-dialog")?.click();
                }}
              >
                Upgrade Subscription
              </button>
            </div>
          ) : (
            <a
              href="/dashboard/subscribe"
              className="w-full text-center py-[12px] bg-[#EBEDFF] text-primary-600 text-[12px] font-[700] leading-[15.6px] rounded-full"
            >
              Subscribe
            </a>
          )}
        </div>
        <div className="subscription-table">
          <SubscriptionTable />
        </div>
      </div>
      <Dialog id="cancel-subscription" contentClass="w-full">
        <div className="w-full flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[12px] text-center">
            <h1 className="text-black text-[24px] font-[800] leading-[32.74px]">
              Cancel subscription
            </h1>
            <p className="text-black text-[16px] font-[700] leading-[19.84px]">
              Are you sure you want to cancel your subscription?
            </p>
            <p className="text-black text-[16px] font-[700] leading-[19.84px]">
              You will be able to have your plan benefits until{" "}
              {myInfo?.subscription_ends_at}
            </p>
          </div>
          <div className="flex flex-col gap-y-[12px]">
            <div className="form-control">
              <label
                htmlFor="cancel-subscription-checkbox"
                className="cursor-pointer label"
              >
                <div
                  className={`flex items-center gap-x-[8px] ${
                    showError && !isCheckboxChecked
                      ? "border-error-600 border"
                      : ""
                  } text-[#83868B]`}
                >
                  <input
                    id="cancel-subscription-checkbox"
                    type="checkbox"
                    className="checkbox !border-2 [--chkbg:theme(colors.primary.600)] [--chkfg:white] checked:border-primary-600"
                    onChange={(e) => {
                      setIsCheckboxChecked(e.target.checked);
                      setShowError(false);
                    }}
                  />
                  <span className="text-[16px] font-[500] leading-[19.84px]">
                    I Understand
                  </span>
                </div>
              </label>
              {showError && !isCheckboxChecked && (
                <p className="text-error-600 text-[14px] font-[500] leading-[19.84px] mt-2">
                  You must check the checkbox before proceeding.
                </p>
              )}
            </div>
            <Button
              disabled={isLoading || !isCheckboxChecked}
              text="Cancel Subscription"
              className="!bg-error-600 !text-white !text-[16px] !font-[700] !leading-[19.84px] border-2 !shadow-none"
              buttonAttributes={{
                onClick: handelCancelSbscription,
              }}
            />

            <OutlineButton
              text="No, Don't Cancel"
              className="w-full !border2 !text-[16px] !font-[700] !leading-[19.84px]"
              options={{
                onClick() {
                  document.getElementById("cancel-subscription")?.click();
                },
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Subscription;
