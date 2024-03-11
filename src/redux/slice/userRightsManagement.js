import { getAllRightsAPI } from "@api/manageUserManagement";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageManageRights: [],
  pageFeatureManageRigths: [],
};

export const getUserMangeRigths = createAsyncThunk(
  "userRights/getUserMangeRigths",
  async (_, { rejectWithValue }) => {
    const res = await getAllRightsAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  },
);

export const userRights = createSlice({
  name: "userRights",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserMangeRigths.fulfilled, (state, action) => {
      const managePages = action.payload.find(
        (item) => item.rights_value === "managePages",
      );
      const managePageFeature = action.payload.filter(
        (item) => item.rights_value === "managePageFeature",
      );

      state.pageManageRights = managePages.sub_rights;
      state.pageFeatureManageRigths = managePageFeature;
    });
  },
});

// export const {} = userRights.actions;
export default userRights.reducer;
