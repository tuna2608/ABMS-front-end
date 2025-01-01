import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isFetching: false,
  error: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Get All
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;

    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;

    },
    // Delete 
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = state.products.filter((p) => p._id !== action.payload)
      return state;
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;

    },
    // Update 
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      // [1,2,3][2] = 4 --> [1,2,4] up date
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product
      return state;

    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Add 
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      // [1,2,3][2] = 4 --> [1,2,4] up date
      state.products.push(action.payload)
      return state;
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;

    }
  },
});

// Action creators are generated for each case reducer function
export const {
  getProductStart, getProductSuccess, getProductFailure,
  deleteProductStart, deleteProductSuccess, deleteProductFailure,
  updateProductStart, updateProductSuccess, updateProductFailure,
  addProductStart, addProductSuccess, addProductFailure


} = productSlice.actions;

export default productSlice.reducer;
