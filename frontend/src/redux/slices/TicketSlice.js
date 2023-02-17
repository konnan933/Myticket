import { createSlice } from '@reduxjs/toolkit';
import { getEventTickets } from 'redux/thunks/Ticket';

const TICKET_INIT_STATE = {
  eventTicketsLoading: false,
  eventTickets: []
};
const ticketSlice = createSlice({
  name: 'ticket',
  initialState: TICKET_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventTickets.pending, (state) => {
      state.eventTicketsLoading = true;
    });
    builder.addCase(getEventTickets.fulfilled, (state, action) => {
      state.eventTicketsLoading = false;
      state.eventTickets = action.payload;
    });
    builder.addCase(getEventTickets.rejected, (state) => {
      state.eventTicketsLoading = false;
    });
  }
});
export default ticketSlice.reducer;
