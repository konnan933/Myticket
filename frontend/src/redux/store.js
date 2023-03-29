import { configureStore } from '@reduxjs/toolkit';
import AdminSlice from './slices/AdminSlice';
import AuthSlice from './slices/AuthSlice';
import EventTypes from './slices/EventTypes';
import LocationSlice from './slices/LocationSlice';
import TicketSlice from './slices/TicketSlice';
import TicketTypes from './slices/TicketTypes';
import CurrencySlice from './slices/CurrencySlice';
import EventSlice from './slices/EventSlice';
import UserSlice from './slices/UserSlice';
import PictureSlice from './slices/PictureSlice';
import BasketSlice from './slices/BasketSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, AuthSlice),
    admin: AdminSlice,
    location: LocationSlice,
    eventTypes: EventTypes,
    ticketTypes: TicketTypes,
    ticket: TicketSlice,
    currencies: CurrencySlice,
    event: EventSlice,
    user: UserSlice,
    picture: PictureSlice,
    basket: BasketSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
export let persistor = persistStore(store);
export default store;
