import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const jobsAndTendersSlice = createSlice({
  name: "jobAndTenders",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = jobsAndTendersSlice.actions;
export default jobsAndTendersSlice.reducer;
