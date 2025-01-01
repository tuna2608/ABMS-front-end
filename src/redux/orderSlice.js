import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
  isFetching: false,
  error: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Get Orders
    getOrdersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.order = action.payload;
    },
    getOrdersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Get All Orders
    getAllOrdersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.order = action.payload;
    },
    getAllOrdersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Add to Order
    createOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.order = action.payload;
    },
    createOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateOrderStatusSuccess: (state, action) => {
      state.isFetching = false;
      state.order = action.payload;
    },
    resetOrdersSuccess: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailure,
  addOrderStart,
  createOrderSuccess,
  createOrderFailure,
  resetOrdersSuccess,
  updateOrderStatusSuccess,
  getAllOrdersStart,
  getAllOrdersSuccess,
  getAllOrdersFailure
} = orderSlice.actions;

export default orderSlice.reducer;
