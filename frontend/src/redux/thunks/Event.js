import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../axios/axois';
import event from 'API/Event';

export const addEvent = createAsyncThunk('event/addEvent', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post(event.event, data).then(() => {
      toast.success('asd');
    });
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

export const getEvents = createAsyncThunk('event/getEvents', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(event.eventDetails);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

export const getSingleEventsDetailed = createAsyncThunk(
  'event/getSingleEventsDetailed',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${event.eventDetails}/${id}`);
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

export const putEvent = createAsyncThunk('event/putEvent', async (data, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await api.put(`${event.event}/${data.id}`, data);
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
  'event/getSingleEvent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${event.event}/${id}`);
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
  'event/deleteEvent',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(event.event + '/' + id).then(() => {
        dispatch(getEvents());
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

export const getFilteredEvent = createAsyncThunk(
  'event/getFilteredEvent',
  async ({ date, eventType, location }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${event.eventFilter}${date}/${location}/${eventType}`);
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
