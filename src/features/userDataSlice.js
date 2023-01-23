
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



const initialState = {
    value: null
};


export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.value = action.payload;
            console.log('userDataaa')
        },
    },
})


export const { updateUserData } = userDataSlice.actions

export default userDataSlice.reducer



