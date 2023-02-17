import { createSlice } from '@reduxjs/toolkit';
import { getEventTypes } from 'redux/thunks/EventTypes';

const EVENT_TYPES_INIT_STATE = { eventTypes: [], eventTypesLoading: false };
const eventTypeSlice = createSlice({
  name: 'eventTypes',
  initialState: EVENT_TYPES_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventTypes.pending, (state) => {
      state.eventTypesLoading = true;
    });
    builder.addCase(getEventTypes.fulfilled, (state, action) => {
      state.eventTypesLoading = false;
      state.eventTypes = action.payload;
    });
    builder.addCase(getEventTypes.rejected, (state) => {
      state.eventTypesLoading = false;
    });
  }
});

export default eventTypeSlice.reducer;
