import { configureStore } from '@reduxjs/toolkit';
import AdminSlice from './slices/AdminSlice';
import AuthSlice from './slices/AuthSlice';

export default configureStore({
  reducer: {
    auth: AuthSlice,
    admin : AdminSlice
  }
});
