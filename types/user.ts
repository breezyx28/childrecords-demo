export type TUserInfo = {
  id: number | string;
  fullname: string;
  email: string;
  nationality: string;
  photo?: string | null;
  children_num: number;
  subscribed: boolean;
  subscription_plan?: string | null;
  subscription_ends_at?: string | null;
  subscription_tier?: string | null;
  trial_consumed: boolean | number;
  [index: string]: any;
};
