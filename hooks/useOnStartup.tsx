"use client";

import { useSearchParams } from "react-router-dom";
import React from "react";

export const useOnStartup = () => {
  useHandleSuccessPayment();
};

export const useHandleSuccessPayment = () => {
  const [paymentSuccess, setPaymentSuccess] = React.useState<boolean | null>(
    null
  );
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const hasPaymentStatus = searchParams.has("paymentStatus");
    const hasPlan = searchParams.has("plan");
    const hasTier = searchParams.has("tier");

    const allPresent = hasPaymentStatus && hasPlan && hasTier;

    setPaymentSuccess(allPresent);

    if (
      allPresent &&
      document.getElementById("subscription-successfuly-dialog")
    ) {
      document.getElementById("subscription-successfuly-dialog")?.click();
    }
  }, []);

  return {
    paymentSuccess: paymentSuccess,
  };
};

export const useHandleCancelPayment = () => {
  const [paymentCancelled, setPaymentCanceled] = React.useState<boolean | null>(
    null
  );
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const hasPaymentStatus = searchParams.has("paymentStatus");
    const PaymentStatusValue = searchParams.get("paymentStatus");

    const isPaymentCancelled = PaymentStatusValue === "cancelled";

    const allPresent = hasPaymentStatus && isPaymentCancelled;

    setPaymentCanceled(allPresent);

    if (allPresent) {
      document.getElementById("subscription-cancelled-dialog")?.click();
    }
  }, []);

  return {
    paymentCancelled: paymentCancelled,
  };
};
