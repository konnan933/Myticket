import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoggedIn, setLoggedUser, setLogin, setRememberMe } from 'redux/slices/AuthSlice';
import auth from '../../API/Auth';
import api from '../../axios/axois';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLog',
  async ({ data, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.post(auth.login, data).then((response) => {
        dispatch(setLoggedIn(true));
        dispatch(setRememberMe(rememberMe));
        dispatch(setLoggedUser(response.data[0]));
        return response;
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const fetchLogout = createAsyncThunk(
  'auth/fetchLogout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.post(auth.logout).then(() => {
        dispatch(setLogin());
        dispatch(setRememberMe(false));
        dispatch(setLoggedIn(false));
      });
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchReg',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      await api.post(auth.register, data).then(() => {
        dispatch(fetchLogin({ email: data.email, password: data.password }));
      });
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const fetchLoggedIn = createAsyncThunk(
  'auth/fetchLoggedIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.get(auth.loggedIn).then((response) => {
        if (response.data !== '') {
          dispatch(fetchLogin({ data: response.data, rememberMe: true }));
        }
      });
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);
