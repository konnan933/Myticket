import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchLogout, fetchRegister } from '../thunks/Auth';

const AUTH_INIT_STATE = {
  login: [{ level: 0 }],
  loginLoading: false,
  loggedIn: false,
  reg: [],
  regLoading: false,
  logoutLoading: false,
  loggedUser: {},
  userId: '',
  emailVerified: {}
};
const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_INIT_STATE,
  reducers: {
    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setLogin: (state) => {
      state.login = [{ level: 0 }];
    },
    setRememberMe: (state, action) => {
      localStorage.setItem('rememberMe', action.payload);
    },
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    }
  },
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

export const { setEmailVerified, setLoggedIn, setLogin, setRememberMe, setLoggedUser } =
  authSlice.actions;

export default authSlice.reducer;
