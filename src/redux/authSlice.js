import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
  userRegister: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state = initialState;
      return state;
    },
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.userRegister = action.payload;
    },
    registerFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    verifyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    verifySuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.user = initialState;
    },
    verifyFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    editProfileStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    editProfileSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    editProfileFail: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout, registerStart, registerSuccess, registerFail, verifyStart, verifyFail, verifySuccess } = userSlice.actions;

export default userSlice.reducer;
