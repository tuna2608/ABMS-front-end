import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isFetching: false,
    error: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
          state.isFetching= true
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
    signupStart: (state) => {
      state.isFetching = true;
      state.error = false;

    },
    signupSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
    },
    signupFail: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout, signupStart, signupSuccess, signupFail } = userSlice.actions;

export default userSlice.reducer;
 