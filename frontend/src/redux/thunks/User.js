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

export const emailVerifiedViaEmail = createAsyncThunk(
  'user/verifyEmail',
  async (rndString, { rejectWithValue }) => {
    try {
      const response = await api.post(`${user.emailConfirmed}/${rndString}`).then(() => {
        window.location.reload(true);
      });
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
  'user/emailVerifiedViaEmail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`${user.confirmEmail}/${id}`);
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
