import { createAsyncThunk } from '@reduxjs/toolkit';
import user from 'API/User';
import { setLoggedIn, setLoggedUser, setLogin, setRememberMe } from 'redux/slices/AuthSlice';
import auth from '../../API/Auth';
import api from '../../axios/axois';
import { getBasketCounter } from './Basket';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLog',
  async ({ data, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.post(auth.login, data).then((response) => {
        dispatch(setLoggedIn(true));
        localStorage.setItem('level', response.data[0].level);
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
        localStorage.setItem('level', 0);
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
      await api.post(auth.register, data).then((response) => {
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
          dispatch(getBasketCounter(response.data.id));
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

export const getLoggedInUser = createAsyncThunk(
  'auth/getLoggedInUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.get(user.loggedUser).then((response) => {
        dispatch(setLoggedUser(response.data));
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
