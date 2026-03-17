export type TAddReminder = {
  date: string;
  title: string;
  type: string;
};
export type TUpdateReminder = {
  id: number;
  date?: string;
  title?: string;
  type?: string;
};
