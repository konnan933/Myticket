import { configureStore } from '@reduxjs/toolkit';
import AdminSlice from './slices/AdminSlice';
import AuthSlice from './slices/AuthSlice';
import EventTypes from './slices/EventTypes';
import LocationSlice from './slices/LocationSlice';

export default configureStore({
  reducer: {
    auth: AuthSlice,
    admin: AdminSlice,
    location: LocationSlice,
    eventTypes: EventTypes
  }
});
