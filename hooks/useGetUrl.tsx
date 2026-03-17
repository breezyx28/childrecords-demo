import { useLocation } from "react-router-dom";

const useGetUrl = () => {
  const pathname = useLocation().pathname;
  let urlAsArray =
    // @ts-ignore
    [...pathname.split("/").filter(Boolean), pathname.split("/").pop()] ?? [];
  let currentPage = urlAsArray.pop() ?? "";
  let includePage = (pageName: string) => {
    return urlAsArray.includes(pageName);
  };
  return {
    urlAsArray: urlAsArray,
    fullUrl: pathname,
    currentPage,
    includePage,
  };
};

export default useGetUrl;
