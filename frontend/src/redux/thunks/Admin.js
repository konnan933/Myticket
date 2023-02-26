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

export const getSingleEventsDetailed = createAsyncThunk(
  'admin/getSingleEventsDetailed',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${admin.eventDetails}/${id}`);
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

export const addEvent = createAsyncThunk('auth/addEvent', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post(admin.event, data);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

export const putEvent = createAsyncThunk('admin/putEvent', async (data, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await api.put(`${admin.event}/${data.id}`, data);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

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

export const addPicture = createAsyncThunk(
  'admin/addPicture',
  async (path, { rejectWithValue }) => {
    try {
      let fd = new FormData();
      fd.append('path', path);
      const response = await api.post(admin.addPicture, fd);
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
export const changePicture = createAsyncThunk(
  'admin/changePicture',
  async ({ path, id }, { dispatch, rejectWithValue }) => {
    try {
      let fd = new FormData();
      fd.append('path', path);
      const response = await api.post(`${admin.changePicture}${id}`, fd).then(() => {
        dispatch(getSingleEvent(id));
        window.location.reload(true);
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
export const getUserEvents = createAsyncThunk(
  'admin/getUserEvents',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${admin.userEvents}/${id}`);
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
