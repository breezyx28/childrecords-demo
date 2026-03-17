"use client";

import React from "react";
import { UpgradePlanCardProps } from "@/types";
import OutlineButton from "@/components/buttons/OutlineButton";
import { useUpgradePlanMutation } from "@/redux/endpoints/subscription";
import { toast } from "sonner";
import { useUserContext } from "@/context/UserContext";
import { calcRank } from "./plan-ranking";

type TDetectPlanLevel = "current" | "upgrade" | "downgrade" | "no-plan";

const UpgradePlanCard = ({
  tag,
  slug,
  title,
  tier,
  price,
  old_price,
  subtitle,
  period,
  features,
  action,
}: // currentId,
UpgradePlanCardProps) => {
  const { userInfo, setLoading } = useUserContext();

  // Search for the current plan id
  let userCurrentPlan = userInfo?.subscription_plan ?? null;
  let userCurrentTier = userInfo?.subscription_tier ?? null;

  const [btnState, setBtnState] = React.useState<TDetectPlanLevel>("upgrade");
  const [upgrade, { isLoading }] = useUpgradePlanMutation();

  const handleUpgradeSubscription = async () => {
    let upgradedSubscriptionData = null;
    try {
      setLoading(true);
      upgradedSubscriptionData = await upgrade({ tier, plan: slug });
      // @ts-ignore
      if (upgradedSubscriptionData?.data?.success) {
        if (upgradedSubscriptionData?.data?.data) {
          window.location.href = upgradedSubscriptionData?.data?.data;
        } else {
          // toast.success("Plan upgraded successfully");
          setTimeout(() => {
            window.location.href = "/dashboard/profile/subscription";
          }, 2000);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("upgrade-subscription-error: ", error);
    }
  };

  let currentRank = calcRank(userCurrentPlan as any, userCurrentTier as any);
  let cardRank = calcRank(slug, tier);

  React.useEffect(() => {
    if (currentRank === cardRank) {
      setBtnState("current");
    } else if (currentRank > cardRank) {
      setBtnState("downgrade");
    } else if (currentRank === 0) {
      setBtnState("no-plan");
    } else {
      setBtnState("upgrade");
    }
  }, [userInfo]);

  const controlButtons = () => {
    if (btnState === "current") {
      return (
        <OutlineButton
          disabled={true}
          type="button"
          text="Current Plan"
          className="w-full md:py-[16px] py-[12px] !border-[0px] !text-[#83868B] md:text-[16px] text-[14px] !font-[700] !bg-[#E2E6ED] group-hover:bg-[#E2E6ED] cursor-not-allowed"
          href={action ?? "#"}
        />
      );
    }
    if (btnState === "upgrade") {
      return (
        <OutlineButton
          type="button"
          text={`Upgrade to ${slug}`}
          className="w-full md:py-[16px] py-[12px] md:text-[16px] text-[14px] font-[700] group-hover:text-primary-600 group-hover:bg-white"
          href={"#"}
          options={{
            onClick(e) {
              // router.push("#upgrade-plan");
              document.getElementById("upgrade-dialog")?.click();
              handleUpgradeSubscription();
            },
          }}
          isLoading={isLoading}
        />
      );
    }

    if (btnState === "downgrade") {
      return (
        <OutlineButton
          disabled={true}
          type="button"
          text={`${slug} Plan`}
          className="w-full capitalize md:py-[16px] py-[12px] !border-[0px] !text-[#83868B] md:text-[16px] text-[14px] !font-[700] !bg-[#E2E6ED] group-hover:bg-[#E2E6ED] cursor-not-allowed"
          href={action ?? "#"}
        />
      );
    }

    return "";
  };

  return (
    <div className="group relative cursor-pointer p-[32px] hover:bg-primary-600 duration-300 ease-in bg-white md:rounded-[24px] rounded-[20px] md:min-h-[626px] min-h-[400px]">
      {tag && (
        <span className="absolute text-white text-[14px] leading-[18.2px] top-[-18px] left-[calc(50%-50px)] py-[8px] px-[16px] bg-[#FE8D00] rounded-[100px]">
          {tag}
        </span>
      )}

      <div className="wrapper flex flex-col gap-y-[32px]">
        <div className="plan-details flex flex-col gap-y-[32px]">
          <div className="flex flex-col gap-y-[8px]">
            <p className="group-hover:text-white text-black md:text-[18px] text-[16px] font-[800] leading-[24.55px]">
              {title}
            </p>

            <span className="inline text-black font-[800] flex items-center gap-[8px]">
              <span className="section-title group-hover:text-white">
                ${price}{" "}
              </span>
              {old_price && (
                <span className="group-hover:text-white text-[20px] font-[800] line-through">
                  {old_price}
                </span>
              )}
              <span className="group-hover:text-white text-[14px] leading-[19.1px]">
                {` / ${period}`}
              </span>
            </span>

            <p className="group-hover:text-white md:text-[16px] text-[14px] text-[#83868B] font-[700] leading-[19.84px]">
              {subtitle ?? " "}
            </p>
          </div>
          <div className="w-full">{controlButtons()}</div>
        </div>
        <hr />
        <div className="plan-features flex flex-col gap-y-[12px]">
          {features.map((feature, index) => (
            <FeatureDetail key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

const checkIconGreen = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 26 26"
    fill="none"
  >
    <path
      d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
      fill="#12b76a"
    ></path>
  </svg>
);
const checkIconWhite = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 26 26"
    fill="none"
  >
    <path
      d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm4.78 7.7-5.67 5.67a.75.75 0 0 1-1.06 0l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.76 0 1.06Z"
      fill="#fff"
    ></path>
  </svg>
);

const FeatureDetail = ({ feature }: { feature: string }) => (
  <div className="flex gap-x-[10px] items-center">
    <span className="group-hover:hidden blcok">{checkIconGreen}</span>
    <span className="group-hover:block hidden">{checkIconWhite}</span>
    <span className="group-hover:text-white md:text-[16px] text-[14px] text-black md:font-[700] font-[600] leading-[19.84px]">
      {feature}
    </span>
  </div>
);

export default UpgradePlanCard;
