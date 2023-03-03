import { createAsyncThunk } from '@reduxjs/toolkit';
import picture from 'API/Picture';
import api from '../../axios/axois';
import { getSingleEvent } from './Event';

export const addPicture = createAsyncThunk(
  'picture/addPicture',
  async (path, { rejectWithValue }) => {
    try {
      let fd = new FormData();
      fd.append('path', path);
      const response = await api.post(picture.addPicture, fd);
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
  'picture/changePicture',
  async ({ path, id }, { dispatch, rejectWithValue }) => {
    try {
      let fd = new FormData();
      fd.append('path', path);
      const response = await api.post(`${picture.changePicture}${id}`, fd).then(() => {
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
