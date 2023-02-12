import { createSlice } from '@reduxjs/toolkit';
import { getEvents, getUsers } from 'redux/thunks/Admin';

const ADMIN_INIT_STATE = {
  users: [],
  usersLoading: false,
  deleteUserLoading: false,
  deleteEventLoading: false,
  eventsLoading: false,
  events: []
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
  }
});
export default adminSlice.reducer;
