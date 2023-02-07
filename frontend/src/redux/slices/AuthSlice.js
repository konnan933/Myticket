import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchRegister } from '../thunks/Auth';

const AUTH_INIT_STATE = {
  login: [{level:0}],
  loginLoading: false,
  reg: [],
  regLoading: false
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
      console.log(state);
      state.regLoading = false;
      state.reg = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.regLoading = false;
    });
  }
});
export default authSlice.reducer;
