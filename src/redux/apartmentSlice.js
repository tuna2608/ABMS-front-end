import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apartments: [],
  currentApartment: null,
  isFetching: false,
  error: false,
};

export const apartmentSlice = createSlice({
  name: 'apartment',
  initialState,
  reducers: {
    // Fetch Apartments
    getApartmentsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getApartmentsSuccess: (state, action) => {
      state.isFetching = false;
      state.apartments = action.payload;
    },
    getApartmentsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    createApartmentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createApartmentSuccess: (state, action) => {
      state.isFetching = false;
      state.apartments.push(action.payload);
    },
    createApartmentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    updateApartmentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateApartmentSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.apartments.findIndex(
        apt => apt.apartmentId === action.payload.apartmentId
      );
      if (index !== -1) {
        state.apartments[index] = action.payload;
      }
    },
    updateApartmentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    deleteApartmentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteApartmentSuccess: (state, action) => {
      state.isFetching = false;
      state.apartments = state.apartments.filter(
        apt => apt.apartmentId !== action.payload
      );
    },
    deleteApartmentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getApartmentsStart,
  getApartmentsSuccess,
  getApartmentsFailure,
  createApartmentStart,
  createApartmentSuccess,
  createApartmentFailure,
  updateApartmentStart,
  updateApartmentSuccess,
  updateApartmentFailure,
  deleteApartmentStart,
  deleteApartmentSuccess,
  deleteApartmentFailure,
} = apartmentSlice.actions;

export default apartmentSlice.reducer;