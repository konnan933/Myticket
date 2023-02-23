import { createAsyncThunk } from '@reduxjs/toolkit';
import currency from '../../API/Currency';
import api from '../../axios/axois';

export const getCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(currency.allCurrency);
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


