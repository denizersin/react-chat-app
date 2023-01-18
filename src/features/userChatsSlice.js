import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



const initialState = {
    value: null
};




export const userChatSlice = createSlice({
    name: 'userChats',
    initialState,
    reducers: {
        updateChatsDataValue: (state, action) => {
            state.value = action.payload;
        },
        updateChatDataById: (state, action) => {
            const { id, data } = action.payload;
            state.value[id] = data;
        },
        updateMessagesById: (state, action) => {
            console.log(action.payload);
            const { id, data } = action.payload;
            state.value[id].messages = data;
        },

    },
})


export const { updateChatsDataValue, updateChatDataById, updateMessagesById } = userChatSlice.actions
export default userChatSlice.reducer