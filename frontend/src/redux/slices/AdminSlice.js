import { createSlice } from '@reduxjs/toolkit';
import {
  getEvents,
  getEventTypes,
  getSingleEvent,
  getUserNames,
  getUsers
} from 'redux/thunks/Admin';

const ADMIN_INIT_STATE = {
  users: [],
  usersLoading: false,
  deleteUserLoading: false,
  deleteEventLoading: false,
  eventsLoading: false,
  eventTypesLoading: false,
  events: [],
  singleEvent: {},
  singleEventLoading: false,
  eventTypes: [],
  userNames: [],
  userNamesLoading: false
};
const adminSlice = createSlice({
  name: 'admin',
  initialState: ADMIN_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.usersLoading = false;
    });
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

    builder.addCase(getUserNames.pending, (state) => {
      state.userNamesLoading = true;
    });
    builder.addCase(getUserNames.fulfilled, (state, action) => {
      state.userNamesLoading = false;
      state.userNames = action.payload;
    });
    builder.addCase(getUserNames.rejected, (state) => {
      state.userNamesLoading = false;
    });
  }
});
export default adminSlice.reducer;
