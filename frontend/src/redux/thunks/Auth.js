import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../API/Auth';
import api from '../../axios/axois';

export const fetchLogin = createAsyncThunk('auth/fetchLog', async (data, { rejectWithValue }) => {
  try {
    await api.get('/sanctum/csrf-cookie');
    const response = await api.post(auth.login, data);
    console.log(response);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async (_, { rejectWithValue }) => {
  try {
    await api.post(auth.logout);
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

export const fetchRegister = createAsyncThunk(
  'auth/fetchReg',
  async (data, { rejectWithValue }) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.post(auth.register, data);
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
