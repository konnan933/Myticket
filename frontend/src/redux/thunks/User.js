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

export const getUserEventsWithDetails = createAsyncThunk(
  'user/getUserEventsWithDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${user.userEventsWithDetails}/${id}`);
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

export const updateUser = createAsyncThunk('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    const response = await api.put(`${user.users}/${data.id}`, data);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});
