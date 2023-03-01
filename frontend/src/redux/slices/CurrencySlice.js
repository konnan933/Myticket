import { createSlice } from '@reduxjs/toolkit';
import { getCurrency } from 'redux/thunks/Currencies';

const CURRENCY_INIT_STATE = {
  currenciesLoading: false,
  currencies: []
};
const currencySlice = createSlice({
  name: 'currencies',
  initialState: CURRENCY_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrency.pending, (state) => {
      state.currenciesLoading = true;
    });
    builder.addCase(getCurrency.fulfilled, (state, action) => {
      state.currenciesLoading = false;
      state.currencies = action.payload;
    });
    builder.addCase(getCurrency.rejected, (state) => {
      state.currenciesLoading = false;
    });
  }
});
export default currencySlice.reducer;
