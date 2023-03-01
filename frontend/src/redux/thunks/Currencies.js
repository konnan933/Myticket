import { createAsyncThunk } from '@reduxjs/toolkit';
import currencies from '../../API/Currencies';
import api from '../../axios/axois';

export const getCurrency = createAsyncThunk(
  'currencies/getCurrency',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(currencies.allCurrency);
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
