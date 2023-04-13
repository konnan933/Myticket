import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../axios/axois';
import event from 'API/Event';
import i18nReduxToast from 'PageContent/utils/i18nReduxToast';
import i18n from 'i18n';

export const addEvent = createAsyncThunk('event/addEvent', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post(event.event, data).then(() => {
      i18nReduxToast(i18n.language, 'Success');
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
    const response = await api.put(`${event.event}/${data.id}`, data).then(() => {
      i18nReduxToast(i18n.language, 'Success');
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

export const getPromotedEvents = createAsyncThunk(
  'event/getPromotedEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${event.event}s/promoted`);
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

export const getSoldEventTickets = createAsyncThunk(
  'event/getSoldTickets',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.get(event.soldEventTickets + eventId);
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
