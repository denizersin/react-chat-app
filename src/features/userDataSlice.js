
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { store } from './store';



const initialState = {
    value: null
};

export const userDataSelctor = (state) => state.userData.value;
export const getUserDataVal = () => store.getState().userData.value;

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



