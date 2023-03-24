import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/user";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

// reference: https://redux-toolkit.js.org/tutorials/quick-start
