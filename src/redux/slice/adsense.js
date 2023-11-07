import { getAdSenseAPI } from "@api/adsense";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    adSense: {
        loading: false,
        data: [],
    },
};

export const getAdSense = createAsyncThunk("adSense/getAdSense",
    async (payload, { rejectWithValue }) => {
        const res = await getAdSenseAPI({ ...payload });
        if (res.remote === "success") {
            return res.data;
        } else {
            return rejectWithValue(res.error);
        }
    }
);

export const adSenseSlice = createSlice({
    name: "adSense",
    initialState,
    reducers: {
        addAdSense: (state, action) => {
            const newAdSense = [action.payload, ...state.adSense.data];
            state.adSense = {
                loading: false,
                data: newAdSense,
            };
        },
        removeAdSense: (state, action) => {
            const newAdSense = state.adSense.data.filter((item) => { return item.id !== action.payload.id; });
            state.categories = {
                loading: false,
                data: newAdSense,
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAdSense.fulfilled, (state, action) => {
            state.adSense = {
                loading: false,
                data: action.payload.results,
                count: action.payload.count,
            };
        });
        builder.addCase(getAdSense.pending, (state) => {
            state.adSense = {
                loading: true,
                data: [],
            };
        });
        builder.addCase(getAdSense.rejected, (state) => {
            state.adSense = {
                ...state.adSense,
                loading: false,
            };
        });
    }
});

export const {
    addAdSense,
    removeAdSense
} = adSenseSlice.actions;
export default adSenseSlice.reducer;
