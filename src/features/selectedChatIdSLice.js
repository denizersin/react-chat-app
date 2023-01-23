import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
};

export const selectedChatIdSlice = createSlice({
    name: 'selectedChatId',
    initialState,
    reducers: {
        setSelectedChatId: (state, action) => {
            state.value = action.payload;
        },
    },
})

export const { setSelectedChatId } = selectedChatIdSlice.actions

export default selectedChatIdSlice.reducer