// slices/alertSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionState {
  isSubscribed: boolean;
  mustUpgrade: boolean;
  trialConsumed: boolean;
  plan: null | string;
  tier: null | string;
}

interface AlertState {
  showSubscriptionAlert: boolean;
  subscription: SubscriptionState;
}

const initialState: AlertState = {
  showSubscriptionAlert: false,
  subscription: {
    isSubscribed: true,
    mustUpgrade: false,
    trialConsumed: false,
    plan: null,
    tier: null,
  },
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showSubscriptionAlert: (state) => {
      state.showSubscriptionAlert = true;
    },
    hideSubscriptionAlert: (state) => {
      state.showSubscriptionAlert = false;
    },
    setSubscriptionStatus: (
      state,
      action: PayloadAction<{
        isSubscribed: boolean;
        mustUpgrade: boolean;
        trialConsumed: boolean;
        plan: null | string;
        tier: null | string;
      }>
    ) => {
      state.subscription.isSubscribed = action.payload.isSubscribed;
      state.subscription.mustUpgrade = action.payload.mustUpgrade;
      state.subscription.trialConsumed = action.payload.trialConsumed;
    },
    resetSubscriptionStatus: (state) => {
      state.subscription = initialState.subscription;
    },
  },
});

export const {
  showSubscriptionAlert,
  hideSubscriptionAlert,
  setSubscriptionStatus,
  resetSubscriptionStatus,
} = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
