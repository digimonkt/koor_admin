import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/user";
import ChoiceReducer from "./slice/choices";
import ToastReducer from "./slice/toast";
import JobsAndTendersReducer from "./slice/jobsAndTenders";
import InvoiceReducer from "./slice/invoice";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    choice: ChoiceReducer,
    toast: ToastReducer,
    jobsAndTenders: JobsAndTendersReducer,
    invoice: InvoiceReducer
  },
});

// reference: https://redux-toolkit.js.org/tutorials/quick-start
