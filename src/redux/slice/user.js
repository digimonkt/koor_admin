import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  adminMail: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setAdminMail: (state, action) => {
      state.adminMail = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setIsLoggedIn, setRole, setAdminMail } = authSlice.actions;
export default authSlice.reducer;
