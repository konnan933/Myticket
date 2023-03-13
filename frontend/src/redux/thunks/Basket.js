import { createAsyncThunk } from '@reduxjs/toolkit';
import basket from 'API/Basket';
import api from '../../axios/axois';

export const postBasket = createAsyncThunk(
  'basket/postBasket',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      api.post(`${basket.basket}`, data).then(() => {
        dispatch(getBasket(data.user));
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
// ! nincs megirva a vegpont szóval nem működik
export const getBasket = createAsyncThunk('basket/getBasket', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`${basket.basket}/user/${id}`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});
