import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoggedIn } from 'redux/slices/AuthSlice';
import auth from '../../API/Auth';
import api from '../../axios/axois';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLog',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.post(auth.login, data).then(() => {
        dispatch(setLoggedIn(true));
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
      const response = await api.post(auth.register, data).then(() => {
        dispatch(setLoggedIn(true));
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
