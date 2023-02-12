import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout, fetchRegister } from '../thunks/Auth';

const AUTH_INIT_STATE = {
  login: [{ level: 0 }],
  loginLoading: false,
  reg: [],
  regLoading: false,
  logoutLoading: false
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
    builder.addCase(fetchRegister.pending, (state) => {
      state.regLoading = true;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.regLoading = false;
      state.reg = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.regLoading = false;
    });
    builder.addCase(fetchLogout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(fetchLogout.rejected, (state) => {
      state.logoutLoading = false;
    });
  }
});
export default authSlice.reducer;
