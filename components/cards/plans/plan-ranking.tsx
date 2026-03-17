export const calcRank = (
  plan: "free" | "trial" | "basic" | "premium" | null,
  tier: "monthly" | "yearly" | null
) => {
  let currentPlanRank = 0;
  let currentTierRank = 0;

  let monthRnak = 10;
  let yearRank = 20;
  let free = 1;
  let basic = 2;
  let premium = 3;

  if (plan === "free" || plan === "trial") {
    currentPlanRank = free;
  }
  if (plan === "basic") {
    currentPlanRank = basic;
  }
  if (plan === "premium") {
    currentPlanRank = premium;
  }
  if (tier === "monthly") {
    currentTierRank = monthRnak;
  }
  if (tier === "yearly") {
    currentTierRank = yearRank;
  }
  if (tier === null || plan === null) {
    currentTierRank = 0;
  }

  return currentPlanRank + currentTierRank;
};
