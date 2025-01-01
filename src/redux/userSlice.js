import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    isFetching: false,
    error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      // Get All
      getUserStart: (state) => {
          state.isFetching = true;
          state.error = false;
      },
      getUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users = action.payload;
      },
      getUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
         
    },
        // Delete 
      deleteUserStart: (state) => {
          state.isFetching = true;
          state.error = false;
      },
      deleteUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users = state.users.filter((u) => u._id !== action.payload)
        return state;
      },
      deleteUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
         
    },
      // Update 
        updateUserStart: (state) => {
          state.isFetching = true;
          state.error = false;
      },
      updateUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users = state.users.map((u) => u._id === action.payload.id ? action.payload : u)
        return state;
      },
      updateUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    },
      // Add 
      addUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = [...state.users, action.payload]
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
       
  }
  },
});

// Action creators are generated for each case reducer function
export const {
  getUserStart, getUserSuccess, getUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  updateUserStart, updateUserSuccess, updateUserFailure,
  addUserStart, addUserSuccess, addUserFailure

               
 } = userSlice.actions;

export default userSlice.reducer;
 