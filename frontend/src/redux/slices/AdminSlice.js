import { createSlice } from '@reduxjs/toolkit';
import { getUserNames, getUsers } from 'redux/thunks/Admin';

const ADMIN_INIT_STATE = {
  users: [],
  usersLoading: false,
  deleteUserLoading: false,
  deleteEventLoading: false,
  userNames: [],
  userEvents: [],
  userNamesLoading: false,
  userEventsLoading: false
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
