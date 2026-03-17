import { hideSubscriptionAlert } from "@/redux/slices/alertSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const SubscriptionAlert = () => {
  const show = useSelector((state: any) => state.alert.showSubscriptionAlert); // Access the alert state
  const dispatch = useDispatch();

  if (!show) return null;

  return (
    <div className="alert">
      <p>Upgrade your plan to continue.</p>
      <button onClick={() => dispatch(hideSubscriptionAlert())}>Close</button>
    </div>
  );
};

export default SubscriptionAlert;
