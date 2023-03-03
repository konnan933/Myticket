import { createAsyncThunk } from '@reduxjs/toolkit';
import user from 'API/User';
import api from '../../axios/axois';

export const getUserEvents = createAsyncThunk(
  'user/getUserEvents',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${user.userEvents}/${id}`);
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
