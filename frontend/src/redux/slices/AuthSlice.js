import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin } from '../thunks/Auth';

const AUTH_INIT_STATE = {
  login: [],
  loginLoading: false
};
const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.login = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.loginLoading = false;
    });
  }
});
export default authSlice.reducer;
