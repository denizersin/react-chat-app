import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { store } from './store';
import { setLoading, unSetLoading } from './isLoadingSlice';
import { firebaseAuth } from '../services/fbAuth';


const initialState = {
    user: undefined,
    status: 'none'
};


export const logIn = createAsyncThunk('user/logIn', async ({ email, password }) => {
    const user = await firebaseAuth.login(email, password);
    return user;
})

export const logOut = createAsyncThunk('user/logOut', async () => {
    console.log('asd')
    const user = await firebaseAuth.logOut();
    return user;
})

export const register = createAsyncThunk('user/register', async ({ email, password, displayName, avatarUrl }) => {
    const user = await firebaseAuth.register(email, password, displayName, avatarUrl);
    return user;
})


export const checkUser = createAsyncThunk('user/checkUser', async () => {
    const response = await firebaseAuth.checkUser();
    return response
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.user.userData = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(checkUser.fulfilled, (state, action) => {
                state.user = action.payload;
                console.log(action.payload)
                state.status = "succeeded"
                setTimeout(() => {
                    store.dispatch(unSetLoading())
                }, 10);

            })
            .addCase(checkUser.pending, (state) => {
                state.status = "loading"
                setTimeout(() => {
                    store.dispatch(setLoading())
                }, 10);
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(action, 'qweqwe')
                console.log(action)
                state.user = action.payload;
                setTimeout(() => {
                    store.dispatch(unSetLoading())
                }, 10);
            })
            .addCase(logIn.pending, (state) => {
                setTimeout(() => {
                    store.dispatch(setLoading())
                }, 10);
                state.status = 'loading'
            })
            .addCase(logIn.rejected, (state, action) => {
                state.status = 'filled'
                setTimeout(() => {
                    store.dispatch(unSetLoading())
                }, 10);
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(action.payload)
                state.user = action.payload;
                setTimeout(() => {
                    store.dispatch(unSetLoading())
                }, 10);
            })
            .addCase(register.pending, (state) => {
                setTimeout(() => {
                    store.dispatch(setLoading())
                }, 10);
                state.status = 'loading'
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'filled'
                setTimeout(() => {
                    store.dispatch(unSetLoading())
                }, 10);
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = null;
                setTimeout(() => {
                    store.dispatch(unSetLoading())
                }, 10);
            })
            .addCase(logOut.pending, (state) => {
                setTimeout(() => {
                    store.dispatch(setLoading())
                }, 10);
                state.status = 'loading'
            })
            .addCase(logOut.rejected, (state, action) => {
                state.status = 'filled'
                setTimeout(() => {
                    store.dispatch(unSetLoading())
                }, 10);
            })
    },


})


export const { updateUserData } = userSlice.actions;
export default userSlice.reducer