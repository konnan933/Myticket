import { createAsyncThunk } from '@reduxjs/toolkit';
import location from 'API/Location';
import { setAddedLocation } from 'redux/slices/LocationSlice';
import api from '../../axios/axois';

export const addLocation = createAsyncThunk(
  'location/addLocation',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(location.location, data).then((response) => {
        dispatch(setAddedLocation({ id: response.data.id, name: response.data.name }));
        dispatch(getLocations());
        dispatch(getLocationNames());
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
      const response = await api.get(location.location);
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
      await api.delete(`${location.location}/${id}`).then(() => {
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
      await api.put(`${location.location}/${data.id}`, data).then(() => {
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
      const response = await api.get(location.locationNames);
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
