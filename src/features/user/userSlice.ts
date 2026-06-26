import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user_name: string;
  headline: string;
}

const initialState: UserState = {
  user_name: "",
  headline: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user_name = action.payload.user_name;
      state.headline = action.payload.headline;
    },
    clearUser: (state) => {
      state.user_name = "";
      state.headline = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
