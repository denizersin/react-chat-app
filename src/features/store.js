import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import isLoadingReducer from './isLoadingSlice'
import userChatsReducer from './userChatsSlice'
export const store = configureStore({
    reducer: {
        user: userReducer,
        isLoading: isLoadingReducer,
        userChats: userChatsReducer
    },
})

