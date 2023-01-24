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
            setTime(action.payload);

            const { id, data } = action.payload;
            state.value[id] = data;
        },
        updateMessagesById: (state, action) => {
            const { id, data } = action.payload;
            state.value[id].messages = data;
        },
        addNewChatToUserChats: (state, action) => {
            const chatData = action.payload;
            state.value[chatData.id] = chatData;
        },
        updateAMessageById: (state, action) => {
            const { chatId, id, data } = action.payload
            console.log(action.payload)
            console.log(action.payload.chatId)
            console.log(JSON.stringify(Object.keys(state.value)), chatId)
            const index = state.value[chatId].messages.findIndex(msgData => msgData.id == data.id)
            state.value[chatId].messages[index] = data

        }
    },
})


export const { updateChatsDataValue, updateChatDataById, updateMessagesById, addNewChatToUserChats, updateAMessageById } = userChatSlice.actions
export default userChatSlice.reducer





function setTime(obj) {
    // for (const [key, value] of Object.entries(obj)) {
    //     if (value instanceof Object) {
    //         setTime(value)
    //     }

    //     if (key == 'sawTime' || key == "rescievedTime" || key == 'sentTime') {
    //         obj[key] = 1;
    //     }
    // }
}
