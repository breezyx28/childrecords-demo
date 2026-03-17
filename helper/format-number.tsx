import _ from "lodash";

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${_.round(num / 1_000_000, 1)}M`; // Format as millions (e.g., 1.2M)
  } else if (num >= 1_000) {
    return `${_.round(num / 1_000, 1)}K`; // Format as thousands (e.g., 100.5K)
  } else {
    return num.toString(); // Less than 1,000 remains as is
  }
};

// Example Usage
// console.log(formatNumber(123456789)); // "123.5M"
// console.log(formatNumber(98765)); // "98.8K"
// console.log(formatNumber(543)); // "543"
