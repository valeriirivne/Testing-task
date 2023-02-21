import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const shoppingCartProductsSlice = createSlice({
  name: 'shoppingCartProducts',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log(action);
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      console.log(existingProductIndex);

      if (existingProductIndex >= 0) {
        // If the product already exists in the shopping cart, increase its quantity
        state.products[existingProductIndex].quantity +=
          action.payload.quantity;
      } else {
        // If the product does not exist in the shopping cart, add it to the list
        state.products.push(action.payload);
      }
    },
    decrementQuantity: (state, action) => {
      console.log(action);
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        const existingProduct = state.products[existingProductIndex];

        if (existingProduct.quantity > 1) {
          // If the product's quantity is greater than 1, decrease it by 1
          existingProduct.quantity--;
        } else {
          // If the product's quantity is 1, remove it from the shopping cart
          //   state.products.splice(existingProductIndex, 1);
          state.products[existingProductIndex].splice(existingProductIndex, 1);
        }
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id === action.payload.id
      );
    },
    // updateQuantity: (state, action) => {
    //   const existingProductIndex = state.products.findIndex(
    //     (product) => product.id === action.payload.id
    //   );

    //   if (existingProductIndex >= 0) {
    //     state.products[existingProductIndex].quantity = action.payload.quantity;
    //   }
    // },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  clearCart,
  decrementQuantity,
} = shoppingCartProductsSlice.actions;

export default shoppingCartProductsSlice.reducer;
