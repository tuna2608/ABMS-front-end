import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    form: {},
    isFetching: false,
    error: false,
};

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        // Get One Form
        getFormStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getFormSuccess: (state, action) => {
            state.isFetching = false;
            state.form = action.payload;
        },
        getFormFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // Get All Forms
        getAllFormsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getAllFormsSuccess: (state, action) => {
            state.isFetching = false;
            state.form = action.payload;
        },
        getAllFormsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // Create Form
        createFormStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        createFormSuccess: (state, action) => {
            state.isFetching = false;
            state.form = action.payload;
        },
        createFormFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // Update Status
        updateFormStatusSuccess: (state, action) => {
            state.isFetching = false;
            state.form = action.payload;
        },

        // Reset
        resetFormsSuccess: () => {
            return initialState;
        },
    },
});

export const {
    getFormStart,
    getFormSuccess,
    getFormFailure,
    getAllFormsStart,
    getAllFormsSuccess,
    getAllFormsFailure,
    createFormStart,
    createFormSuccess,
    createFormFailure,
    updateFormStatusSuccess,
    resetFormsSuccess,
} = formSlice.actions;

export default formSlice.reducer;
