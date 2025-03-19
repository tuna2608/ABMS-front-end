import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {},
  isFetching: false,
  error: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // Get Orders
    getPostsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPostsSuccess: (state, action) => {
      state.isFetching = false;
      state.post = action.payload;
    },
    getPostsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Get All Orders
    getAllPostsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllPostsSuccess: (state, action) => {
      state.isFetching = false;
      state.post = action.payload;
    },
    getAllPostsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // Add to Order
    createPostStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createPostSuccess: (state, action) => {
      state.isFetching = false;
      state.order = action.payload;
    },
    createPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updatePostStatusSuccess: (state, action) => {
      state.isFetching = false;
      state.order = action.payload;
    },
    resetPostsSuccess: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getPostsStart,getPostsSuccess,getPostsFailure,getAllPostsStart,getAllPostsSuccess,getAllPostsFailure
} = postSlice.actions;

export default postSlice.reducer;
