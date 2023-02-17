import { createAsyncThunk } from '@reduxjs/toolkit';
import ticketTypes from 'API/TicketTypes';
import api from '../../axios/axois';

export const getTicketTypes = createAsyncThunk(
  'ticketTypes/getTicketTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ticketTypes.ticketTypes);
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
export const addTicketType = createAsyncThunk(
  'ticketTypes/addTicketTypes',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(ticketTypes.ticketTypes, data).then(() => {
        dispatch(getTicketTypes());
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

export const updateTicketType = createAsyncThunk(
  'ticketTypes/updateTicketTypes',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`${ticketTypes.ticketTypes}/${data.id}`, data).then(() => {
        dispatch(getTicketTypes());
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
export const deleteTicketType = createAsyncThunk(
  'ticketTypes/deleteTicketType',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`${ticketTypes.ticketTypes}/${id}`).then(() => {
        dispatch(getTicketTypes());
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
