"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSubscribed } from "@/redux/ApiConfig";
import { toast } from "sonner";
import Loading from "@/components/loading/loading";

export default function isUserSubscribed(Component: any) {
  return function IsUserSubscribed(props: any) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [subscribed, setSubscribed] = useState(isSubscribed);

    useEffect(() => {
      if (!subscribed) {
        // toast.error("You are not subscribed ... please subscribe first");
        navigate("/dashboard/subscribe");
      } else {
        setLoading(false);
      }
    }, [subscribed, navigate]);

    // While loading, don't render the page to avoid hydration issues.
    if (loading) {
      return (
        <div className="w-full h-full">
          <Loading />;
        </div>
      );
    }

    return <Component {...props} />;
  };
}
