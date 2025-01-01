import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
  isFetching: false,
  error: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reset Cart
    resetCartSuccess: (state) => {
      state.cart = {};
      state.isFetching = false;
      state.error = true;
    },

    // Get cart
    getCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCartSuccess: (state, action) => {
      state.isFetching = false;
      state.cart = action.payload;
    },
    getCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Add to cart
    addToCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addToCartSuccess: (state, action) => {
      state.isFetching = false;
      state.cart = action.payload;
    },
    addToCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Update cart
    decreaseCartQuantitySuccess: (state, action) => {
      state.cart = action.payload;
    },
    // delete cart item
    deleteCartItemSuccess: (state, action) => {
      state.cart = action.payload;
    },
    // delete cart item
    deleteCartSuccess: (state, action) => {
      state.cart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  resetCartSuccess,
  decreaseCartQuantitySuccess,
  deleteCartItemSuccess,
  deleteCartSuccess

} = cartSlice.actions;

export default cartSlice.reducer;
