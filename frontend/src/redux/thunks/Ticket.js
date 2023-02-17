import { createAsyncThunk } from '@reduxjs/toolkit';
import ticket from '../../API/Ticket';
import api from '../../axios/axois';

export const getEventTickets = createAsyncThunk(
  'ticket/getEventTickets',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${ticket.eventTickets}/${eventId}`);
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
