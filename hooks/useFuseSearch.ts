import Fuse, { IFuseOptions } from "fuse.js";
import { useMemo } from "react";

// Helper function to parse "DD/MM/YYYY" into a Date object
const parseDate = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split("/").map(Number);
  if (!day || !month || !year) return null; // Invalid date
  return new Date(year, month - 1, day); // JS Date months are 0-indexed
};

// Function to filter data based on date range
const filterByDate = <T extends { created_at?: string }>(
  data: T[],
  selectedDateFilter: string
): T[] => {
  const now = new Date();
  let filteredData = data;

  switch (selectedDateFilter) {
    case "now":
      filteredData = data.filter((item) => {
        const itemDate = parseDate(item.created_at || "");
        return itemDate && itemDate.toDateString() === now.toDateString(); // Same day
      });
      break;
    case "last_week":
      filteredData = data.filter((item) => {
        const itemDate = parseDate(item.created_at || "");
        if (!itemDate) return false;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return itemDate >= oneWeekAgo && itemDate <= now;
      });
      break;
    case "last_month":
      filteredData = data.filter((item) => {
        const itemDate = parseDate(item.created_at || "");
        if (!itemDate) return false;
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return itemDate >= oneMonthAgo && itemDate <= now;
      });
      break;
    default:
      break; // "all" or no filter
  }

  return filteredData;
};

/**
 * Custom hook to perform Fuse.js search with optional date filtering
 */
export const useFuseSearch = <T extends { created_at?: string }>(
  data: T[] | undefined,
  searchQuery: string,
  keys: Array<keyof T>,
  selectedDateFilter: string,
  options: IFuseOptions<T> = {}
) => {
  const fuse = useMemo(() => {
    if (!data) return null;
    return new Fuse(data, {
      keys: keys as string[],
      threshold: 0.1,
      ...options,
    });
  }, [data, keys, options]);

  const filteredResults = useMemo(() => {
    if (!data) return [];
    let filteredData = filterByDate(data, selectedDateFilter);

    if (!searchQuery || !fuse) return filteredData;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, data, selectedDateFilter]);

  return filteredResults;
};
