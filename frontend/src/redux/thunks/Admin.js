import { createAsyncThunk } from '@reduxjs/toolkit';
import admin from 'API/Admin';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/axois';

export const getUsers = createAsyncThunk('admin/getUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(admin.users);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});


export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete(admin.users + '/' + id);
    return response.data;
  } catch (err) {
    console.log(err);
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

export const deleteEvent = createAsyncThunk(
  'admin/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(admin.event + '/' + id);
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
