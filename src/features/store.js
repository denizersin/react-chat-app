import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from './userAuthSlice'
import isLoadingReducer from './isLoadingSlice'
import userChatsReducer from './userChatsSlice'
import userDataReducer from './userDataSlice'
import selectedChatIdReducer from './selectedChatIdSLice'

export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        isLoading: isLoadingReducer,
        userChats: userChatsReducer,
        userData: userDataReducer,
        selectedChatId: selectedChatIdReducer,
    },
    middleware: (getDefaultMiddleware) =>  //!unserializable warning (important!) 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

