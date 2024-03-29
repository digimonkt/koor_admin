import { manageEmployer } from "@api/employers";
import {
  getCountriesName,
  getEducationLevelsAPI,
  getLanguagesAPI,
  getSkillsAPI,
} from "@api/jobs";
import {
  getTenderCategoryAPI,
  getTenderOpportunityTypeAPI,
  getTenderSectorAPI,
  getTenderTagsAPI,
} from "@api/tender";
import { getCityApi, getWorldCityApi } from "@api/manageCountryCity";
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

  worldCities: {
    loading: false,
    data: [],
  },

  categories: {
    loading: false,
    data: [],
  },
  educationLevels: {
    loading: false,
    data: [],
  },
  subCategories: {
    loading: false,
    data: {},
  },
  languages: {
    loading: false,
    data: [],
  },
  skills: {
    loading: false,
    data: [],
  },
  employers: {
    loading: false,
    data: [],
  },
  sectors: {
    loading: false,
    data: [],
  },

  tags: {
    loading: false,
    data: [],
  },
  opportunityTypes: {
    loading: false,
    data: [],
  },
  tenderCategories: {
    loading: false,
    data: [],
  },
};
// counties
export const getCountries = createAsyncThunk(
  "choices/getCountries",
  async (payload, { rejectWithValue }) => {
    const res = await getCountriesName({ ...payload });
    if (res.remote === "success") {
      return res.data;
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

// WorldCities
export const getWorldCities = createAsyncThunk(
  "choices/getWorldCities",
  async (data, { rejectWithValue }) => {
    const res = await getWorldCityApi(data);
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
  async (payload, { rejectWithValue }) => {
    const res = await manageCategoryApi({ ...payload });
    if (res.remote === "success") {
      return res.data;
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

// Sectors
export const getTenderSector = createAsyncThunk(
  "choices/sectors",
  async (data, { rejectWithValue }) => {
    const res = await getTenderSectorAPI(data);
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

// TenderOrganizationType
export const getTenderOpportunityType = createAsyncThunk(
  "choices/opportunityTypes",
  async (_, { rejectWithValue }) => {
    const res = await getTenderOpportunityTypeAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

// TenderTags
export const getTenderTags = createAsyncThunk(
  "choices/tags",
  async (_, { rejectWithValue }) => {
    const res = await getTenderTagsAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

// TenderCategory
export const getTenderCategories = createAsyncThunk(
  "choices/tenderCategories",
  async (_, { rejectWithValue }) => {
    const res = await getTenderCategoryAPI();
    if (res.remote === "success") {
      return res.data;
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

    addCity: (state, action) => {
      const newCity = [
        action.payload,
        ...(state.worldCities.data[action.payload.countryId] || []),
      ];
      state.worldCities = {
        loading: false,
        data: {
          ...state.worldCities.data,
          [action.payload.countryId]: [...newCity],
        },
      };
    },

    addWorldCity: (state, action) => {
      const newWorldCity = [
        action.payload,
        ...(state.worldCities.data[action.payload.countryId] || []),
      ];
      state.worldCities = {
        loading: false,
        data: {
          ...state.worldCities.data,
          [action.payload.countryId]: [...newWorldCity],
        },
      };
    },

    addCategories: (state, action) => {
      const newCategory = [action.payload, ...state.categories.data];
      state.categories = {
        loading: false,
        data: newCategory,
      };
    },

    addSubCategories: (state, action) => {
      const newSubCategory = [
        action.payload,
        ...(state.subCategories.data[action.payload.categoryId] || []),
      ];
      state.subCategories = {
        loading: false,
        data: {
          ...state.subCategories.data,
          [action.payload.categoryId]: [...newSubCategory],
        },
      };
    },
    removeCategory: (state, action) => {
      const newCategory = state.categories.data.filter((cate) => {
        return cate.id !== action.payload.id;
      });
      state.categories = {
        loading: false,
        data: newCategory,
      };
    },

    removeSubCategory: (state, action) => {
      const newSubCategory = (
        state.subCategories.data[action.payload.categoryId] || []
      ).filter((cate) => {
        return cate.id !== action.payload.id;
      });
      state.subCategories = {
        loading: false,
        data: {
          ...state.subCategories.data,
          [action.payload.categoryId]: [...newSubCategory],
        },
      };
    },

    removeCountry: (state, action) => {
      const newCountry = state.countries.data.filter((cate) => {
        return cate.id !== action.payload.id;
      });
      state.countries = {
        loading: false,
        data: newCountry,
      };
    },

    removeCity: (state, action) => {
      const newCity = (
        state.cities.data[action.payload.countryId] || []
      ).filter((cate) => {
        return cate.id !== action.payload.id;
      });
      state.cities = {
        loading: false,
        data: {
          ...state.cities.data,
          [action.payload.countryId]: [...newCity],
        },
      };
    },
  },
  extraReducers: (builder) => {
    //  Countries
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = {
        loading: false,
        data: action.payload.results,
        count: action.payload.count,
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

    //  WorldCities
    builder.addCase(getWorldCities.fulfilled, (state, action) => {
      state.worldCities = {
        loading: false,
        data: {
          ...(state.worldCities.data || {}),
          [action.payload.countryId]: action.payload.data.length
            ? action.payload.data
            : null,
        },
      };
    });
    builder.addCase(getWorldCities.pending, (state) => {
      state.worldCities = {
        ...state.worldCities,
        loading: true,
      };
    });
    builder.addCase(getWorldCities.rejected, (state) => {
      state.worldCities = {
        ...state.worldCities,
        loading: false,
      };
    });

    //  Categories
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = {
        loading: false,
        data: action.payload.results,
        count: action.payload.count,
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
      state.subCategories = {
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
    // language
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.languages = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getLanguages.pending, (state) => {
      state.languages = {
        ...state.languages,
        loading: true,
      };
    });
    builder.addCase(getLanguages.rejected, (state) => {
      state.languages = {
        ...state.languages,
        loading: false,
      };
    });
    // education
    builder.addCase(getEducationLevels.fulfilled, (state, action) => {
      state.educationLevels = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getEducationLevels.pending, (state) => {
      state.educationLevels = {
        ...state.educationLevels,
        loading: true,
      };
    });
    builder.addCase(getEducationLevels.rejected, (state) => {
      state.educationLevels = {
        ...state.educationLevels,
        loading: false,
      };
    });
    // skills
    builder.addCase(getSkills.fulfilled, (state, action) => {
      state.skills = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getSkills.pending, (state) => {
      state.skills = {
        ...state.skills,
        loading: true,
        data: [],
      };
    });
    builder.addCase(getSkills.rejected, (state) => {
      state.skills = {
        ...state.skills,
        loading: false,
      };
    });
    // Employer
    builder.addCase(getEmployers.fulfilled, (state, action) => {
      state.employers = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getEmployers.pending, (state) => {
      state.employers = {
        ...state.employers,
        loading: true,
        data: [],
      };
    });
    builder.addCase(getEmployers.rejected, (state) => {
      state.employers = {
        ...state.employers,
        loading: false,
      };
    });
    builder.addCase(getTenderSector.pending, (state) => {
      state.sectors = {
        ...state.sectors,
        loading: true,
      };
    });
    builder.addCase(getTenderSector.fulfilled, (state, action) => {
      state.sectors = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getTenderSector.rejected, (state) => {
      state.sectors = {
        ...state.sectors,
        loading: false,
      };
    });
    builder.addCase(getTenderOpportunityType.fulfilled, (state, action) => {
      state.opportunityTypes = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getTenderOpportunityType.pending, (state) => {
      state.opportunityTypes = {
        ...state.opportunityTypes,
        loading: true,
        data: [],
      };
    });
    builder.addCase(getTenderOpportunityType.rejected, (state) => {
      state.opportunityTypes = {
        ...state.opportunityTypes,
        loading: false,
      };
    });
    builder.addCase(getTenderTags.fulfilled, (state, action) => {
      state.tags = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getTenderTags.pending, (state) => {
      state.tags = {
        ...state.tags,
        loading: true,
        data: [],
      };
    });
    builder.addCase(getTenderTags.rejected, (state) => {
      state.tags = {
        ...state.tags,
        loading: false,
      };
    });
    builder.addCase(getTenderCategories.fulfilled, (state, action) => {
      state.tenderCategories = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getTenderCategories.pending, (state) => {
      state.tenderCategories = {
        ...state.tenderCategories,
        loading: true,
        data: [],
      };
    });
    builder.addCase(getTenderCategories.rejected, (state) => {
      state.tenderCategories = {
        ...state.tenderCategories,
        loading: false,
      };
    });
  },
});
// Language
export const getLanguages = createAsyncThunk(
  "choices/getLanguages",
  async (_, { rejectWithValue }) => {
    const res = await getLanguagesAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);
// education
export const getEducationLevels = createAsyncThunk(
  "choices/getEducationLevels",
  async (_, { rejectWithValue }) => {
    const res = await getEducationLevelsAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);
// skills
export const getSkills = createAsyncThunk(
  "choices/skills",
  async (data, { rejectWithValue }) => {
    const res = await getSkillsAPI(data);
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);
export const getEmployers = createAsyncThunk(
  "choice/employers",
  async (_, { rejectWithValue }) => {
    const res = await manageEmployer();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);
export const {
  addCountry,
  addCategories,
  removeCategory,
  removeCountry,
  addSubCategories,
  removeSubCategory,
  removeCity,
  addCity,
  addWorldCity,
} = choiceSlice.actions;
export default choiceSlice.reducer;
