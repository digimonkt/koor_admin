import { createSlice } from "@reduxjs/toolkit";
import { MESSAGE_TYPE } from "@utils/enum";

const initialState = {
  message: "",
  type: MESSAGE_TYPE.null,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setSuccessToast: (state, action) => {
      state.message = action.payload;
      state.type = MESSAGE_TYPE.success;
    },
    setErrorToast: (state, action) => {
      state.message = action.payload;
      state.type = MESSAGE_TYPE.error;
    },
    setWarningToast: (state, action) => {
      state.message = action.payload;
      state.type = MESSAGE_TYPE.warning;
    },
    resetToast: (state, action) => {
      state.message = "";
      state.type = MESSAGE_TYPE.null;
    },
  },
});
export const { setSuccessToast, setErrorToast, setWarningToast, resetToast } =
  toastSlice.actions;
export default toastSlice.reducer;
