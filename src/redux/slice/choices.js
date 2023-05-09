import { getCountriesName } from "@api/jobs";
import { getCityApi } from "@api/manageCountryCity";
import { getJobSubCategoryApi } from "@api/managejobSubCategory";
import { manageCategoryApi } from "@api/manageoptions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: {
    loading: false,
    data: [],
  },
  cities: {
    loading: false,
    data: {},
  },

  categories: {
    loading: false,
    data: [],
  },

  subCategories: {
    loading: false,
    data: [],
  },
};
// counties
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
// cities
export const getCitiesByCountry = createAsyncThunk(
  "choices/getCitiesByCountry",
  async (data, { rejectWithValue }) => {
    const res = await getCityApi(data);
    if (res.remote === "success") {
      return {
        countryId: data.countryId,
        data: res.data.results,
      };
    } else {
      return rejectWithValue(res.error);
    }
  }
);
// categories
export const getCategories = createAsyncThunk(
  "choices/getCategories",
  async (_, { rejectWithValue }) => {
    const res = await manageCategoryApi();
    if (res.remote === "success") {
      return res.data.results;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

// Sub categories
export const getSubCategories = createAsyncThunk(
  "choices/getSubCategories",
  async (data, { rejectWithValue }) => {
    const res = await getJobSubCategoryApi(data);
    if (res.remote === "success") {
      return {
        categoryId: data.categoryId,
        data: res.data.results,
      };
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const choiceSlice = createSlice({
  name: "choice",
  initialState,
  extraReducers: (builder) => {
    //  Countries
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
    //  Cities
    builder.addCase(getCitiesByCountry.fulfilled, (state, action) => {
      state.cities = {
        loading: false,
        data: {
          ...(state.cities.data || {}),
          [action.payload.countryId]: action.payload.data.length
            ? action.payload.data
            : null,
        },
      };
    });
    builder.addCase(getCitiesByCountry.pending, (state) => {
      state.cities = {
        ...state.cities,
        loading: true,
      };
    });
    builder.addCase(getCitiesByCountry.rejected, (state) => {
      state.cities = {
        ...state.cities,
        loading: false,
      };
    });

    //  Categories
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getCategories.pending, (state) => {
      state.categories = {
        loading: true,
        data: [],
      };
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.categories = {
        ...state.categories,
        loading: false,
      };
    });
    //  SubCategories
    builder.addCase(getSubCategories.fulfilled, (state, action) => {
      state.cities = {
        loading: false,
        data: {
          ...(state.subCategories.data || {}),
          [action.payload.categoryId]: action.payload.data.length
            ? action.payload.data
            : null,
        },
      };
    });
    builder.addCase(getSubCategories.pending, (state) => {
      state.subCategories = {
        ...state.subCategories,
        loading: true,
      };
    });
    builder.addCase(getSubCategories.rejected, (state) => {
      state.subCategories = {
        ...state.subCategories,
        loading: false,
      };
    });
  },
});

export default choiceSlice.reducer;
