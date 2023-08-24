import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
};

export const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = invoiceSlice.actions;
export default invoiceSlice.reducer;
