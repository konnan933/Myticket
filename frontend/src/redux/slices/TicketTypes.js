import { createSlice } from '@reduxjs/toolkit';
import { getTicketTypes } from 'redux/thunks/TicketTypes';

const TICKET_TYPES_INIT_STATE = { ticketTypes: [], TicketTypesLoading: false };
const ticketTypeSlice = createSlice({
  name: 'ticketTypes',
  initialState: TICKET_TYPES_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketTypes.pending, (state) => {
      state.TicketTypesLoading = true;
    });
    builder.addCase(getTicketTypes.fulfilled, (state, action) => {
      state.TicketTypesLoading = false;
      state.ticketTypes = action.payload;
    });
    builder.addCase(getTicketTypes.rejected, (state) => {
      state.TicketTypesLoading = false;
    });
  }
});

export default ticketTypeSlice.reducer;
