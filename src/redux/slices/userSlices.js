import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: '',
    email: '',
    role: '',
    access_token: ''
}

export const userSlices = createSlice ({
    name: 'counter',
    initialState,
    reducers: {
        updateUser: (state,action) => {
            const {name, email, role, access_token} = action.payload
            console.log('action',action);
        }
    }
})

export const {increment, decrement, incrementByAmount} = userSlices.actions

export default userSlices.reducer