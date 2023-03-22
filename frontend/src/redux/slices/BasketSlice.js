import { createSlice } from '@reduxjs/toolkit';
import { getBasket, getBasketCounter, getBasketWithDetalis } from 'redux/thunks/Basket';

const BASKET_INIT_STATE = {
  basket: [],
  basketLoading: false,
  basketWithDetails: [],
  basketWithDetailsLoading: false,
  basketCount: 0
};
const basketSlice = createSlice({
  name: 'basket',
  initialState: BASKET_INIT_STATE,
  reducers: {
    basketCounter: (state, action) => {
      state.basketCount += action.payload;
    }
  },
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
    builder.addCase(getBasketWithDetalis.pending, (state) => {
      state.basketWithDetailsLoading = true;
    });
    builder.addCase(getBasketWithDetalis.fulfilled, (state, action) => {
      state.basketWithDetails = action.payload;
      state.basketWithDetailsLoading = false;
    });
    builder.addCase(getBasketWithDetalis.rejected, (state) => {
      state.basketWithDetailsLoading = false;
    });
    builder.addCase(getBasketCounter.fulfilled, (state, action) => {
      state.basketCount = action.payload;
    });
  }
});

export const { basketCounter } = basketSlice.actions;

export default basketSlice.reducer;
