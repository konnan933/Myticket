import { createAsyncThunk } from '@reduxjs/toolkit';
import basket from 'API/Basket';
import { basketCounter } from 'redux/slices/BasketSlice';
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

export const getBasketCounter = createAsyncThunk(
  'basket/getBasketCounter',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${basket.ticketCount}${id}`);
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

export const deleteUserBasket = createAsyncThunk(
  'basket/deleteUserBasket',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`${basket.basket}/user/${id}`).then(() => {
        dispatch(getBasketWithDetalis(id));
        dispatch(getBasketCounter(id));
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

export const deleteBasket = createAsyncThunk(
  'basket/deleteBasket',
  async (localbasket, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`${basket.basket}/${localbasket.id}`).then(() => {
        dispatch(getBasketWithDetalis(localbasket.user));
        dispatch(basketCounter(localbasket.numberOfTickets * -1));
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

export const getBasketWithDetalis = createAsyncThunk(
  'basket/getBasketWithDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${basket.basketWithDetails}/${id}`);
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

export const pay = createAsyncThunk('basket/pay', async (id, { rejectWithValue }) => {
  try {
    const response = await api.put(`${basket.pay}/${id}`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});

export const putBasket = createAsyncThunk(
  'basket/putBasket',
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    try {
      console.log(data);
      api.put(`${basket.basket}/${id}`, data).then(() => {
        dispatch(getBasketCounter(data.user));
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
