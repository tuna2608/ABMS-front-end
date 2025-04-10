import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
  userRegister: null,
  forgotPasswordEmail: null,
  forgotPasswordStep: null, // 'initial', 'otp_sent', 'otp_verified'
  changePasswordStatus: null // 'idle', 'loading', 'success', 'error'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      Object.assign(state, initialState);
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
      state.currentUser = action.payload;
      state.error = false;
    },
    editProfileFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Forgot Password Actions
    forgotPasswordStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
      state.forgotPasswordEmail = action.payload;
      state.forgotPasswordStep = 'initial';
    },
    forgotPasswordOtpSent: (state) => {
      state.isFetching = false;
      state.error = false;
      state.forgotPasswordStep = 'otp_sent';
    },
    forgotPasswordOtpVerified: (state) => {
      state.isFetching = false;
      state.error = false;
      state.forgotPasswordStep = 'otp_verified';
    },
    forgotPasswordReset: (state) => {
      state.isFetching = false;
      state.error = false;
      state.forgotPasswordEmail = null;
      state.forgotPasswordStep = null;
    },
    forgotPasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    changePasswordStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.changePasswordStatus = 'loading';
    },
    changePasswordSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.changePasswordStatus = 'success';
    },
    changePasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.changePasswordStatus = 'error';
    },
    resetChangePasswordStatus: (state) => {
      state.changePasswordStatus = 'idle';
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  registerStart, 
  registerSuccess, 
  registerFail, 
  verifyStart, 
  verifyFail, 
  verifySuccess,
  editProfileFail,
  editProfileSuccess,
  editProfileStart,
  // New forgot password actions
  forgotPasswordStart,
  forgotPasswordOtpSent,
  forgotPasswordOtpVerified,
  forgotPasswordReset,
  forgotPasswordFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  resetChangePasswordStatus
} = userSlice.actions;

export default userSlice.reducer;