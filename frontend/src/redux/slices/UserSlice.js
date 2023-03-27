import { createSlice } from '@reduxjs/toolkit';
import { emailVerifiedViaEmail, getUserEvents, getUserEventsWithDetails } from 'redux/thunks/User';

const USER_INIT_STATE = {
  userEvents: [],
  userEventsWithDetails: [],
  userEventsLoading: false,
  userEventsWithDetailsLoading: false,
  emailVerify: {},
  emailVerifyLoading: false
};
const userSlice = createSlice({
  name: 'user',
  initialState: USER_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserEvents.pending, (state) => {
      state.userEventsLoading = true;
    });
    builder.addCase(getUserEvents.fulfilled, (state, action) => {
      state.userEventsLoading = false;
      state.userEvents = action.payload;
    });
    builder.addCase(getUserEvents.rejected, (state) => {
      state.userEventsLoading = false;
    });
    builder.addCase(getUserEventsWithDetails.pending, (state) => {
      state.userEventsWithDetailsLoading = true;
    });
    builder.addCase(getUserEventsWithDetails.fulfilled, (state, action) => {
      state.userEventsWithDetailsLoading = false;
      state.userEventsWithDetails = action.payload;
    });
    builder.addCase(getUserEventsWithDetails.rejected, (state) => {
      state.userEventsWithDetailsLoading = false;
    });
    builder.addCase(emailVerifiedViaEmail.pending, (state) => {
      state.emailVerifyLoading = true;
    });
    builder.addCase(emailVerifiedViaEmail.fulfilled, (state, action) => {
      state.emailVerifyLoading = false;
      state.emailVerify = action.payload;
    });
    builder.addCase(emailVerifiedViaEmail.rejected, (state) => {
      state.emailVerifyLoading = false;
    });
  }
});

export default userSlice.reducer;
