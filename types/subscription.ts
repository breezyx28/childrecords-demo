export type TUpgradePlan = {
  plan: "premium" | "basic"; // 'basic' or 'premium'
  tier: TSubscriptionTier["tier"]; // 'monthly' or 'yearly'
};

export type TSubscriptionTier = {
  tier: "yearly" | "monthly";
};
