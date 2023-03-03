import { createSlice } from '@reduxjs/toolkit';
import { getEvents, getSingleEvent, getSingleEventsDetailed } from 'redux/thunks/Event';

const EVENT_INIT_STATE = {
  deleteEventLoading: false,
  eventsLoading: false,
  events: [],
  singleEvent: {},
  singleEventLoading: false,
  singleDetailedEvent: {},
  singleDetailedEventLoading: false
};
const eventSlice = createSlice({
  name: 'event',
  initialState: EVENT_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state) => {
      state.eventsLoading = true;
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.eventsLoading = false;
      state.events = action.payload;
    });
    builder.addCase(getEvents.rejected, (state) => {
      state.eventsLoading = false;
    });
    builder.addCase(getSingleEvent.pending, (state) => {
      state.singleEventLoading = true;
    });
    builder.addCase(getSingleEvent.fulfilled, (state, action) => {
      state.singleEventLoading = false;
      state.singleEvent = action.payload;
    });
    builder.addCase(getSingleEvent.rejected, (state) => {
      state.singleEventLoading = false;
    });

    builder.addCase(getSingleEventsDetailed.pending, (state) => {
      state.singleDetailedEventLoading = true;
    });
    builder.addCase(getSingleEventsDetailed.fulfilled, (state, action) => {
      state.singleDetailedEventLoading = false;
      state.singleDetailedEvent = action.payload[0];
    });
    builder.addCase(getSingleEventsDetailed.rejected, (state) => {
      state.singleDetailedEventLoading = false;
    });
  }
});
export default eventSlice.reducer;
