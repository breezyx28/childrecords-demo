"use client";

import { getCurrentUser } from "@/redux/ApiConfig";
import { TUserInfo } from "@/types/user";

export const freePlan = {
  monthly: {
    maxChildren: 1,
  },
  yearly: {
    maxChildren: 1,
  },
};
export const basicPlan = {
  monthly: {
    maxChildren: 1,
  },
  yearly: {
    maxChildren: 1,
  },
};
export const premiumPlan = {
  monthly: {
    maxChildren: 3,
  },
  yearly: {
    maxChildren: 3,
  },
};

export const plansChildrenRestrictions = (data: TUserInfo) => {
  if (data?.subscription_plan === "trial") {
    if (data?.subscription_tier === "monthly") {
      return freePlan.monthly.maxChildren <= data?.children_num ? true : false;
    }
    return freePlan.yearly.maxChildren <= data?.children_num ? true : false;
  } else if (data?.subscription_plan === "basic") {
    if (data.subscription_tier === "monthly") {
      return basicPlan.monthly.maxChildren <= data?.children_num ? true : false;
    }
    return basicPlan.yearly.maxChildren <= data?.children_num ? true : false;
  } else if (data?.subscription_plan === "premium") {
    if (data.subscription_tier === "monthly") {
      return premiumPlan.monthly.maxChildren <= data?.children_num
        ? true
        : false;
    }
    return premiumPlan.yearly.maxChildren <= data?.children_num ? true : false;
  } else {
    return freePlan.monthly.maxChildren <= data?.children_num ? true : false;
  }
};

export const allowedNumberOfChildrens = (data: TUserInfo) => {
  if (data?.subscription_plan === "trial") {
    if (data?.subscription_tier === "monthly") {
      return freePlan.monthly.maxChildren;
    }
    return freePlan.yearly.maxChildren;
  } else if (data?.subscription_plan === "basic") {
    if (data.subscription_tier === "monthly") {
      return basicPlan.monthly.maxChildren;
    }
    return basicPlan.yearly.maxChildren;
  } else if (data?.subscription_plan === "premium") {
    if (data.subscription_tier === "monthly") {
      return premiumPlan.monthly.maxChildren;
    }
    return premiumPlan.yearly.maxChildren;
  } else {
    return 0;
  }
};

export const isRestricted = plansChildrenRestrictions(getCurrentUser()) ?? true;
