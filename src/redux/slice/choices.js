import { getCountriesName } from "@api/jobs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: {
    loading: false,
    data: [],
  },
  currency_code: {
    loading: false,
    data: [],
  },
  country_code: {
    loading: false,
    data: [],
  },
  iso_code2: {
    loading: false,
    data: [],
  },
  iso_code3: {
    loading: false,
    data: [],
  },
};

export const getCountries = createAsyncThunk(
  "choices/getCountries",
  async (_, { rejectWithValue }) => {
    const res = await getCountriesName();
    if (res.remote === "success") {
      return res.data.results;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const choiceSlice = createSlice({
  name: "choice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getCountries.pending, (state) => {
      state.countries = {
        loading: true,
        data: [],
      };
    });
    builder.addCase(getCountries.rejected, (state) => {
      state.countries = {
        ...state.countries,
        loading: false,
      };
    });
  },
});

export default choiceSlice.reducer;
