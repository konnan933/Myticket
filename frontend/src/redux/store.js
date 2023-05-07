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

const store = configureStore({
  reducer: {
    auth: AuthSlice,
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
  }
});
export default store;
