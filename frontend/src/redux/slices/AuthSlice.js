import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout, fetchRegister } from '../thunks/Auth';

const AUTH_INIT_STATE = {
  login: [{ level: 0 }],
  loginLoading: false,
  loggedIn: false,
  reg: [],
  regLoading: false,
  logoutLoading: false
};
const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_INIT_STATE,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loginLoading = false;
      console.log(action.payload);
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

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
