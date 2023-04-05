import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/user";
import ChoiceReducer from "./slice/choices";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    choice: ChoiceReducer,
  },
});

// reference: https://redux-toolkit.js.org/tutorials/quick-start
