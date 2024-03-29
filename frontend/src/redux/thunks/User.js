import { createAsyncThunk } from '@reduxjs/toolkit';
import user from 'API/User';
import api from '../../axios/axois';
import { getLoggedInUser } from './Auth';

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
  async (rndString, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`${user.emailConfirmed}/${rndString}`).then(() => {
        dispatch(getLoggedInUser());
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
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post(`${user.resetPassword}`, email);
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

export const resettedPassword = createAsyncThunk(
  'user/resettedPassword',
  async ({ rndString, formData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${user.resettedPassword}/${rndString}`, formData);
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

export const checkUserEmail = createAsyncThunk(
  'user/checkUserEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post(`${user.checkEmail}`, email);
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
