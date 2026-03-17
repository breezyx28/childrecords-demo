import { isAuthenticated } from "@/redux/ApiConfig";

export const IsAuthenticated = () => {
  return isAuthenticated() ?? (window.location.href = "/login");
};
