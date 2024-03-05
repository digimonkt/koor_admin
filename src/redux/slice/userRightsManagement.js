import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rights: {},
};

export const userRights = createSlice({
  name: "userRights",
  initialState,
  reducers: {
    setUserRights: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserRights } = userRights.actions;
export default userRights.reducer;
