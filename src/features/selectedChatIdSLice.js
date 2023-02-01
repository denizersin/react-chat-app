import { createSlice } from '@reduxjs/toolkit'
import { store } from './store';

const initialState = {
    value: null
};

export const selectedChatIdSelector = (state) => state.selectedChatId.value;
export const getSelectedChatIdVal = () => store.getState().selectedChatId.value

export const selectedChatIdSlice = createSlice({
    name: 'selectedChatId',
    initialState,
    reducers: {
        setSelectedChatId: (state, action) => {
            console.log(state.value,action.payload)
            state.value = action.payload;
        },
    },
})

export const { setSelectedChatId } = selectedChatIdSlice.actions

export default selectedChatIdSlice.reducer