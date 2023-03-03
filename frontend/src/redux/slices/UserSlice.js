import { createSlice } from '@reduxjs/toolkit';
import { getUserEvents } from 'redux/thunks/User';

const USER_INIT_STATE = {
  userEvents: [],
  userEventsLoading: false
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
  }
});
export default userSlice.reducer;
