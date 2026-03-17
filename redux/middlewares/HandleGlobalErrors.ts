import { ClearUser } from "@/helper/ClearUser";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";
import { toast } from "sonner";
import { setSubscriptionStatus } from "../slices/alertSlice";
import { TOEKN_KEY } from "@/config/config";
import { getCurrentUser } from "@/redux/ApiConfig";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    let currentUrl = null;

    if (typeof window !== "undefined") {
      currentUrl = window.location.href;
    }

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const error = action.payload; // Assuming the error object is stored in the payload

      // @ts-ignore
      if (error?.status === 401) {
        deleteCookie(TOEKN_KEY);
        setCookie("redirect-url", currentUrl);

        // @ts-ignore
        if (error?.data?.message !== "Login failed") {
          // toast.error("Unauthenticated");
          setTimeout(() => {
            ClearUser();
            window.location.href = "/login";
          }, 3000);
        }
      }

      // @ts-ignore
      if (error.status === 402) {
        // toast.error("Upgrade your plan to continue");
        if (typeof document !== "undefined") {
          document.getElementById("upgrade-dialog")?.click();
        }

        api.dispatch(
          setSubscriptionStatus({
            isSubscribed: getCurrentUser()?.subscribed,
            mustUpgrade: getCurrentUser()?.subscribed,
            trialConsumed: getCurrentUser()?.trial_consumed,
            plan: getCurrentUser()?.subscription_plan,
            tier: getCurrentUser()?.subscription_tier,
          })
        ); // Dispatch the action to show the alert
      }

      // @ts-ignore
      if (error?.status === 400) {
        // @ts-ignore
        // toast.error(error?.data?.errors);
      }

      // @ts-ignore
      if (error?.status === "FETCH_ERROR") {
        toast.info(
          "Error: Internet Issue ... couldn't fetch results due to internet weakness",
          {
            position: "bottom-right",
          }
        );
      }
    }

    return next(action);
  };
