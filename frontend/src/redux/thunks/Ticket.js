import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'i18n';
import i18nReduxToast from 'PageContent/utils/i18nReduxToast';
import ticket from '../../API/Ticket';
import api from '../../axios/axois';

export const getEventTickets = createAsyncThunk(
  'ticket/getEventTickets',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${ticket.eventAllTickets}/${eventId}`);
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

export const deleteEventTicket = createAsyncThunk(
  'ticket/deleteEventTickets',
  async ({ ticketId, eventId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`${ticket.eventTickets}/${ticketId}`).then(() => {
        dispatch(getEventTickets(eventId));
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

export const addTicket = createAsyncThunk(
  'ticket/addTicket',
  async ({ data, eventId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(ticket.eventTickets, data).then(() => {
        i18nReduxToast(i18n.language, 'Success');
        dispatch(getEventTickets(eventId));
      });
      return response?.data;
    } catch (err) {
      if (!err.response) {
        i18nReduxToast(i18n.language, 'Fail');
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const putEventTicket = createAsyncThunk(
  'ticket/putEventTickets',
  async ({ data, ticketId, eventId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(`${ticket.eventTickets}/${ticketId}`, data).then(() => {
        i18nReduxToast(i18n.language, 'Success');
        dispatch(getEventTickets(eventId));
      });
      return response?.data;
    } catch (err) {
      if (!err.response) {
        i18nReduxToast(i18n.language, 'Fail');
        throw err;
      }
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);
