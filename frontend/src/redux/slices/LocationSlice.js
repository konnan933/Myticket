import { createSlice } from '@reduxjs/toolkit';
import { getLocationNames, addLocation, getLocations } from '../thunks/Location';

const LOCATIONS_INIT_STATE = {
  locationNames: [],
  locationNamesLoading: false,
  addLocation: [],
  addLocationLoading: false,
  locations: [],
  locationsLoading: false
};
const locationSlice = createSlice({
  name: 'auth',
  initialState: LOCATIONS_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocationNames.pending, (state) => {
      state.locationNamesLoading = true;
    });
    builder.addCase(getLocationNames.fulfilled, (state, action) => {
      state.locationNamesLoading = false;
      state.locationNames = action.payload;
    });
    builder.addCase(getLocationNames.rejected, (state) => {
      state.locationNamesLoading = false;
    });

    builder.addCase(addLocation.pending, (state) => {
      state.addLocationLoading = true;
    });
    builder.addCase(addLocation.fulfilled, (state) => {
      state.addLocationLoading = false;
    });
    builder.addCase(addLocation.rejected, (state) => {
      state.addLocationLoading = false;
    });

    builder.addCase(getLocations.pending, (state) => {
      state.locationsLoading = true;
    });
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locationsLoading = false;
      state.locations = action.payload;
    });
    builder.addCase(getLocations.rejected, (state) => {
      state.locationsLoading = false;
    });
  }
});

export default locationSlice.reducer;
