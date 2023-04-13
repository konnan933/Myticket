import { createSlice } from '@reduxjs/toolkit';
import {
  getEvents,
  getFilteredEvent,
  getPromotedEvents,
  getSingleEvent,
  getSingleEventsDetailed,
  getSoldEventTickets
} from 'redux/thunks/Event';

const EVENT_INIT_STATE = {
  deleteEventLoading: false,
  eventsLoading: false,
  events: [],
  singleEvent: {},
  singleEventLoading: false,
  singleDetailedEvent: {},
  singleDetailedEventLoading: false,
  filteredEvent: [],
  filteredEventLoading: false,
  promotedEvents: [],
  promotedEventsLoading: false,
  soldEventTickets: null,
  soldEventTicketsLoading: false
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
      state.singleEvent = action.payload;
      state.singleEventLoading = false;
    });
    builder.addCase(getSingleEvent.rejected, (state) => {
      state.singleEventLoading = false;
    });

    builder.addCase(getSingleEventsDetailed.pending, (state) => {
      state.singleDetailedEventLoading = true;
    });
    builder.addCase(getSingleEventsDetailed.fulfilled, (state, action) => {
      state.singleDetailedEvent = action.payload[0];
      state.singleDetailedEventLoading = false;
    });
    builder.addCase(getSingleEventsDetailed.rejected, (state) => {
      state.singleDetailedEventLoading = false;
    });

    builder.addCase(getFilteredEvent.pending, (state) => {
      state.filteredEventLoading = true;
    });
    builder.addCase(getFilteredEvent.fulfilled, (state, action) => {
      state.filteredEvent = action.payload;
      state.filteredEventLoading = false;
    });
    builder.addCase(getFilteredEvent.rejected, (state) => {
      state.filteredEventLoading = false;
    });

    builder.addCase(getPromotedEvents.pending, (state) => {
      state.promotedEventsLoading = true;
    });
    builder.addCase(getPromotedEvents.fulfilled, (state, action) => {
      state.promotedEvents = action.payload;
      state.promotedEventsLoading = false;
    });
    builder.addCase(getPromotedEvents.rejected, (state) => {
      state.promotedEventsLoading = false;
    });

    builder.addCase(getSoldEventTickets.pending, (state) => {
      state.soldEventTicketsLoading = true;
    });
    builder.addCase(getSoldEventTickets.fulfilled, (state, action) => {
      state.soldEventTickets = action.payload;
      state.soldEventTickets = false;
    });
    builder.addCase(getSoldEventTickets.rejected, (state) => {
      state.soldEventTickets = false;
    });
  }
});
export default eventSlice.reducer;
