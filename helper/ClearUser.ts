import { TOEKN_KEY } from "@/config/config";
import { deleteCookie } from "cookies-next";
import { removeUserData } from "./user-data";

export const ClearUser = (): void => {
  try {
    deleteCookie(TOEKN_KEY);
    removeUserData();
  } catch (error) {
    console.log("could not perforem deleting user data");
  }
};
