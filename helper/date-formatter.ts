import dayjs from "dayjs";

export function formatDate(isoDate: string): string {
  return dayjs(isoDate).format("MMM D, YYYY"); // Outputs "Nov 14, 2024"
}
