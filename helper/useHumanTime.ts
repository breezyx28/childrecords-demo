import dayjs from "dayjs";
import "dayjs/locale/en"; // Import the locale you want to use
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar"; // Import the locale you want to use

const useHumanTime = (timestamp: string | undefined, lang = "ar") => {
  dayjs.extend(relativeTime);
  const notificationTime = dayjs(timestamp);
  return notificationTime.locale(lang).toNow(true);
};

export default useHumanTime;
