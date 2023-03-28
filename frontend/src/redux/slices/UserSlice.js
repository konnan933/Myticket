import { createSlice } from '@reduxjs/toolkit';
import {
  checkUserEmail,
  emailVerifiedViaEmail,
  getUserEvents,
  getUserEventsWithDetails,
  resettedPassword
} from 'redux/thunks/User';

const USER_INIT_STATE = {
  userEvents: [],
  userEventsWithDetails: [],
  userEventsLoading: false,
  userEventsWithDetailsLoading: false,
  emailVerify: {},
  emailVerifyLoading: false,
  resettedPasswordResponse: {},
  resettedPasswordLoading: false,
  emailTaken: { taken: true }
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
    builder.addCase(resettedPassword.pending, (state) => {
      state.resettedPasswordLoading = true;
    });
    builder.addCase(resettedPassword.fulfilled, (state, action) => {
      state.resettedPasswordLoading = false;
      state.resettedPasswordResponse = action.payload;
    });
    builder.addCase(resettedPassword.rejected, (state) => {
      state.resettedPasswordLoading = false;
    });
    builder.addCase(checkUserEmail.fulfilled, (state, action) => {
      state.resettedPasswordLoading = false;
      state.emailTaken = action.payload;
    });
  }
});

export default userSlice.reducer;
