import { createAsyncThunk } from '@reduxjs/toolkit';
import eventTypes from 'API/EventTypes';
import api from '../../axios/axois';

export const getEventTypes = createAsyncThunk(
  'eventTypes/getEventTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(eventTypes.eventTypes);
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
export const addEventType = createAsyncThunk(
  'eventTypes/addEventTypes',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(eventTypes.eventTypes, data).then(() => {
        dispatch(getEventTypes());
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

export const updateEventType = createAsyncThunk(
  'eventTypes/updateEventTypes',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`${eventTypes.eventTypes}/${data.id}`, data).then(() => {
        dispatch(getEventTypes());
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
export const deleteEventType = createAsyncThunk(
  'eventTypes/deleteEventType',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`${eventTypes.eventTypes}/${id}`).then(() => {
        dispatch(getEventTypes());
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
