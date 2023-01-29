import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../API/Auth';
import api from '../../axios/axois';

export const fetchLogin = createAsyncThunk('auth/fetchLog', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post(auth.login, data);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});
