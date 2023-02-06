import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from 'redux/thunks/Admin';

const ADMIN_INIT_STATE = {
  users: [],
  usersLoading: false
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
  }
});
export default adminSlice.reducer;