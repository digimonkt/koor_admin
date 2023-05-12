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
  async (search, { rejectWithValue }) => {
    const res = await getCountriesName(search);
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
  async (search, { rejectWithValue }) => {
    const res = await manageCategoryApi(search);
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
  reducers: {
    addCountry: (state, action) => {
      const newCountries = [action.payload, ...state.countries.data];
      state.countries = {
        loading: false,
        data: newCountries,
      };
    },
    addCategories: (state, action) => {
      const newCategory = [action.payload, ...state.categories.data];
      state.categories = {
        loading: false,
        data: newCategory,
      };
    },
  },
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
export const { addCountry, addCategories } = choiceSlice.actions;
export default choiceSlice.reducer;
