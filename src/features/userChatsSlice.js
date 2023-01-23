import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



const initialState = {
    value: null
};




export const userChatSlice = createSlice({
    name: 'userChats',
    initialState,
    reducers: {
        updateChatsDataValue: (state, action) => {
            setTime(action.payload);
            console.log(action.payload);
            state.value = action.payload;
        },
        updateChatDataById: (state, action) => {
            setTime(action.payload);

            const { id, data } = action.payload;
            state.value[id] = data;
        },
        updateMessagesById: (state, action) => {
            setTime(action.payload);

            console.log(action.payload);
            const { id, data } = action.payload;
            state.value[id].messages = data;
        },
        addNewChatToUserChats: (state, action) => {
            setTime(action.payload);

            console.log(JSON.stringify(state.value));
            console.log('addNewChatToUserChats', action.payload);
            const chatData = action.payload;
            state.value[chatData.id] = chatData;
        }
    },
})


export const { updateChatsDataValue, updateChatDataById, updateMessagesById, addNewChatToUserChats } = userChatSlice.actions
export default userChatSlice.reducer





function setTime(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (value instanceof Object) {
            setTime(value)
        }

        if (key == 'sawTime' || key == "rescievedTime" || key == 'sentTime') {
            obj[key] = 1;
        }
    }
}
