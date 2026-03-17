"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/redux/ApiConfig";
import { toast } from "sonner";
import Loading from "@/components/loading/loading";
import useGetUrlToken from "@/hooks/useGetUrlToken";
import { useSelector, useDispatch } from "react-redux";
import { useUserContext } from "@/context/UserContext";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(isAuthenticated());

    useGetUrlToken(); // get token from browser url

    const { userInfo, isLoading, isFetching } = useUserContext();
    const isSubscribed = userInfo?.subscribed;
    const trialConsumed = userInfo?.trial_consumed;
    const subscriptionPlan = userInfo?.subscription_plan;
    const childrenNum = userInfo?.children_num;

    const showToast = useCallback((message: string) => {
      // toast.error(message);
      console.log("error.message => ", message);
    }, []);

    // Memoize shouldSubscribe condition
    const shouldSubscribe = useMemo(
      () => auth && !isSubscribed,
      [auth, isSubscribed]
    );

    // Memoize consumedTrial condition
    const consumedTrial = useMemo(
      () =>
        auth &&
        trialConsumed === 1 &&
        isSubscribed &&
        subscriptionPlan === "trial",
      [auth, trialConsumed, isSubscribed, subscriptionPlan]
    );

    // Memoize childrenNumCheck condition
    const childrenNumCheck = useMemo(
      () => auth && childrenNum === 0,
      [auth, childrenNum]
    );

    // Handle unauthenticated users
    useEffect(() => {
      if (!auth) {
        // showToast("Unauthenticated");
        navigate("/login");
      } else {
        setLoading(false);
      }
    }, [auth, showToast, navigate]);

    // MOCK BRANCH: Disable subscription modal
    // Handle subscription requirement
    // useEffect(() => {
    //   if (shouldSubscribe && !isLoading && !isFetching) {
    //     document.getElementById("subscribe-dialog")?.click();
    //   }
    // }, [shouldSubscribe, isLoading, isFetching]);

    // MOCK BRANCH: Disable upgrade modal
    // Handle trial consumption
    // useEffect(() => {
    //   if (consumedTrial && !isLoading && !isFetching) {
    //     showToast("Your free trial has been consumed, please upgrade");
    //     document.getElementById("upgrade-dialog")?.click();
    //   }
    // }, [consumedTrial, showToast, isLoading, isFetching]);

    // Handle childrenNum check
    useEffect(() => {
      if (childrenNumCheck && !shouldSubscribe && !isLoading && !isFetching) {
        navigate("/add-child");
      }
    }, [childrenNumCheck, shouldSubscribe, isLoading, isFetching, navigate]);

    // Final loading state resolution
    useEffect(() => {
      if (
        !loading &&
        !shouldSubscribe &&
        !consumedTrial &&
        !childrenNumCheck &&
        !isLoading &&
        !isFetching
      ) {
        setLoading(false);
      }
    }, [loading, shouldSubscribe, consumedTrial, childrenNumCheck, isFetching]);

    // Render loading screen if still loading
    if (loading || isLoading) {
      return (
        <div className="w-full h-full">
          <Loading />
        </div>
      );
    }

    // Block access if conditions are not met
    // if (shouldSubscribe || consumedTrial || childrenNumCheck) {
    //   return null;
    // }
    
    // MOCK BRANCH: Only block if not authenticated, allow all subscribed/trial states
    // if (shouldSubscribe || consumedTrial) {
    //   return null;
    // }

    // Render the wrapped component if all checks pass
    return <Component {...props} />;
  };
}
