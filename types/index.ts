export type ServiceSectionProps = {
  dir: "ltr" | "rtl";
  title: string;
  subTitle: string;
  list: string[];
  button?: {
    title: string;
    href: string;
  };
};

export type ServiceDetailsCardsProps = ServiceSectionProps[];

export type FaqCardProps = {
  id: number;
  question: string;
  answer: string;
};

export type PlanCardProps = {
  tag?: string | null;
  current?: boolean | null;
  slug: "premium" | "basic" | "free";
  title: string;
  subtitle: string;
  period: string;
  tier: "monthly" | "yearly";
  price: number | string;
  old_price?: number | string | null;
  features: string[];
  action?: any;
};
export type UpgradePlanCardProps = {
  id: number;
  tag?: string | null;
  current?: boolean | null;
  // currentId: number;
  slug: "premium" | "basic";
  title: string;
  subtitle: string;
  period: string;
  tier: "monthly" | "yearly";
  price: number | string;
  old_price?: number | string | null;
  features: string[];
  action?: any;
};
