import { createAsyncThunk } from '@reduxjs/toolkit';
import admin from 'API/Admin';
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

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`${admin.users}/${id}`).then(() => {
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

export const getEvents = createAsyncThunk('admin/getEvents', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(admin.eventDetails);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});
export const getSingleEvent = createAsyncThunk(
  'admin/getSingleEvent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${admin.event}/${id}`);
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
      const response = await api.post(admin.users, data).then(() => {
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
      const response = await api.put(`${admin.users}/${id}`, formData).then(() => {
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

export const addEvent = createAsyncThunk(
  'auth/addEvent',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(admin.event, data).then(() => {
        dispatch(getEvents());
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
export const getEventTypes = createAsyncThunk(
  'admin/getEventTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(admin.eventTypes);
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
      const response = await api.get(admin.userNames);
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

export const getLocationNames = createAsyncThunk(
  'admin/getLocationNames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(admin.locationNames);
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

export const addPicture = createAsyncThunk(
  'admin/addPicture',
  async (path, { rejectWithValue }) => {
    try {
      console.log(typeof path);
      const response = await api.post(admin.addPicture, path);
      return response.data;
    } catch (err) {
      console.log(err);
      if (!err.response) {
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);
