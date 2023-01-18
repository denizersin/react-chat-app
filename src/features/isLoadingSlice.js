import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false
};

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