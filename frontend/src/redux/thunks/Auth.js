import { createAsyncThunk } from '@reduxjs/toolkit';
import user from 'API/User';
import i18n from 'i18n';
import { toast } from 'react-toastify';
import { setLoggedIn, setLoggedUser, setLogin, setRememberMe } from 'redux/slices/AuthSlice';
import auth from '../../API/Auth';
import api from '../../axios/axois';
import { getBasketCounter } from './Basket';
import { verifyEmail } from './User';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLog',
  async ({ data, rememberMe }, { dispatch, rejectWithValue }) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      const response = await api.post(auth.login, data).then((response) => {
        dispatch(setLoggedIn(true));
        localStorage.setItem('level', response.data[0].level);
        dispatch(setRememberMe(rememberMe));
        dispatch(setLoggedUser(response.data[0]));
        return response;
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

export const fetchLogout = createAsyncThunk(
  'auth/fetchLogout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.post(auth.logout).then(() => {
        localStorage.setItem('level', 0);
        dispatch(setLogin());
        dispatch(setRememberMe(false));
        dispatch(setLoggedIn(false));
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

export const fetchRegister = createAsyncThunk(
  'auth/fetchReg',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await api.get('/sanctum/csrf-cookie');
      await api.post(auth.register, data).then((response) => {
        dispatch(fetchLogin({ email: data.email, password: data.password }));
        dispatch(verifyEmail(response.data.id)).then(() => {
          if (i18n.language === 'hu') {
            return toast.success(
              i18n.t('hu', 'Az megerősítő emailt a megadott email címre kiküldtük!')
            );
          } else {
            return toast.success(i18n.t('en', 'Verification email sent for your email address'));
          }
        });
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

export const fetchLoggedIn = createAsyncThunk(
  'auth/fetchLoggedIn',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.get(auth.loggedIn).then((response) => {
        if (response.data !== '') {
          dispatch(fetchLogin({ data: response.data, rememberMe: true }));
          dispatch(getBasketCounter(response.data.id));
        }
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

export const getLoggedInUser = createAsyncThunk(
  'auth/getLoggedInUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.get(user.loggedUser).then((response) => {
        dispatch(setLoggedUser(response.data));
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
