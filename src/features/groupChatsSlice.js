import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { store } from './store';



const initialState = {
    value: null
};


export const groupChatsSelector = (state) => state.groupChats.value;
export const getGroupChatsVal = () => store.getState().groupChats.value;

export const groupChats = createSlice({
    name: 'groupChats',
    initialState,
    reducers: {
        updateGroupChatsData: (state, action) => {
            state.value = action.payload;
        },
        updateGroupChatDataById: (state, action) => {
            const { chatId, data } = action.payload;
            state.value[chatId] = {
                ...state.value[chatId],
                ...data
            };
        },
        updateGroupMessagesById: (state, action) => {
            const { id, messages, allMessages } = action.payload;
            state.value[id].messages = messages;
            state.value[id].allMessages = allMessages;
        },
        addNewChatToGroupChats: (state, action) => {
            const chatData = action.payload;
            state.value[chatData.id] = chatData;
        },
        updateAGroupMessageById: (state, action) => {
            const { chatId, id, data } = action.payload
            console.log(action.payload)
            console.log(action.payload.chatId)
            console.log(JSON.stringify(Object.keys(state.value)), chatId)
            const index = state.value[chatId].messages.findIndex(msgData => msgData.id == data.id)
            state.value[chatId].messages[index] = data

        },
        updateSawMap: (state, action) => {
        }
    },
})


export const { updateGroupChatsData, updateGroupChatDataById, updateGroupMessagesById,
    addNewChatToGroupChats, updateAGroupMessageById } = groupChats.actions
export default groupChats.reducer





