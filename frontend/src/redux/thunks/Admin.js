import { createAsyncThunk } from '@reduxjs/toolkit';
import admin from 'API/Admin';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/axois';


export const getUsers= createAsyncThunk('admin/getUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(admin.getUsers)
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    const { data, status } = err.response;
    return rejectWithValue({ data, status });
  }
});
