import { createSlice } from '@reduxjs/toolkit'
import { store } from './store';

const initialState = {
    value: false
};
export const isLoadingSelector = (state) => state.isLoading.value
export const getIsLoadingVal = () => store.getState().isLoading.value;

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState,
    reducers: {
        setLoading: (state) => {
            console.log("***********")
            state.value = true;
        },
        unSetLoading: (state) => {
            state.value = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoading, unSetLoading } = isLoadingSlice.actions

export default isLoadingSlice.reducer