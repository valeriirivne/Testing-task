import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isLoading: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    getProductsFetch: (state) => {
      state.isLoading = true;
    },
    addItem: (state, action) => {
      state.products.push(action.payload);
    },
    removeItem: (state, action) => {
      state.products = state.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearBasket: (state) => {
      state.products = [];
    },
    fetchProductsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    },
    fetchProductsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  getProductsFetch,
  addItem,
  removeItem,
  clearBasket,
  fetchProductsSuccess,
  fetchProductsError,
} = basketSlice.actions;

export default basketSlice.reducer;
