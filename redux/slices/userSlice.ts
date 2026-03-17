// slices/alertSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "../ApiConfig";
import { saveUserData } from "@/helper/user-data";

interface UserState {
  id: number;
  fullname: string;
  email: string;
  nationality: string;
  photo: string | null;
  children_num: number | null;
  subscribed: boolean;
  subscription_plan: string | null;
  subscription_ends_at: string | null;
  subscription_tier: string | null;
  trial_consumed: number;
}

interface AlertState {
  userInfo: UserState;
}

const initialState: AlertState = {
  userInfo: getCurrentUser(),
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.userInfo = action.payload;
      saveUserData(action.payload);
    },

    getUserChildrens: (state) => {
      return state.userInfo.children_num || getCurrentUser().children_num;
    },
  },
});

export const { setUserInfo, getUserChildrens } = userSlice.actions;

export const userReducer = userSlice.reducer;
