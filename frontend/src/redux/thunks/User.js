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

export const updateUserProfile = createAsyncThunk(
  'user/updateUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.put(`${user.users}/${formData.id}`, formData);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'user/verifyEmail',
  async ({ id, hash }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${user.email}/${id}/${hash}`);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const verifyEmailNotification = createAsyncThunk(
  'user/verifyEmailNotification',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(`${user.emailNotification}`);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const userResetPassword = createAsyncThunk(
  'user/userResetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${user.password}`);
      return response?.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);
