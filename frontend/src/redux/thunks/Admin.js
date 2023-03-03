import { createAsyncThunk } from '@reduxjs/toolkit';
import user from 'API/User';
import api from '../../axios/axois';

export const getUsers = createAsyncThunk('admin/getUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(user.users);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`${user.users}/${id}`).then(() => {
        dispatch(getUsers());
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


export const addUser = createAsyncThunk(
  'auth/addUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(user.users, data).then(() => {
        dispatch(getUsers());
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
export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ formData, id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`${user.users}/${id}`, formData).then(() => {
        dispatch(getUsers());
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

export const getUserNames = createAsyncThunk(
  'admin/getUserNames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(user.userNames);
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


