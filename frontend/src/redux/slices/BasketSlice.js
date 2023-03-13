import { createSlice } from '@reduxjs/toolkit';
import { getBasket } from 'redux/thunks/Basket';

const BASKET_INIT_STATE = { basket: [], basketLoading: false };
const basketSlice = createSlice({
  name: 'basket',
  initialState: BASKET_INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBasket.pending, (state) => {
      state.basketLoading = true;
    });
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.basketLoading = false;
    });
    builder.addCase(getBasket.rejected, (state) => {
      state.basketLoading = false;
    });
  }
});

export default basketSlice.reducer;
