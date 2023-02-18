import { createAsyncThunk } from '@reduxjs/toolkit';
import admin from 'API/Admin';
import api from '../../axios/axois';

export const addLocation = createAsyncThunk(
  'location/addLocation',
  async (location, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(admin.location, location).then(() => {
        dispatch(getLocations());
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

export const getLocations = createAsyncThunk(
  'location/getLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(admin.location);
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
export const deleteLocation = createAsyncThunk(
  'location/deleteLocation',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`${admin.location}/${id}`).then(() => {
        dispatch(getLocations());
      });
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);
export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await api.put(`${admin.location}/${data.id}`, data).then(() => {
        dispatch(getLocations());
      });
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
  'location/getLocationNames',
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
