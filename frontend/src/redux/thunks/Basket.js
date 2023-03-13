import { createAsyncThunk } from '@reduxjs/toolkit';
import basket from 'API/Basket';
import api from '../../axios/axois';

export const postBasket = createAsyncThunk(
  'basket/postBasket',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      console.log(data);
      const response = await api.post(`${basket.basket}`).then(() => {
        dispatch(getBasket);
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
// ! nincs megirva a vegpont szóval nem működik
export const getBasket = createAsyncThunk(
  'basket/postBasket',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${basket.basket}`);
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
