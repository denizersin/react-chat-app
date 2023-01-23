import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { store } from './store';
import { setLoading, unSetLoading } from './isLoadingSlice';
import { firebaseAuth } from '../services/fbAuth';


const initialState = {
    userAuth: undefined,
    status: 'none'
};


export const logIn = createAsyncThunk('userAuth/logIn', async ({ email, password }) => {
    const userAuth = await firebaseAuth.login(email, password);
    return userAuth;
})

export const logOut = createAsyncThunk('userAuth/logOut', async () => {
    console.log('asd')
    const userAuth = await firebaseAuth.logOut();
    return userAuth;
})

export const register = createAsyncThunk('userAuth/register', async ({ email, password, displayName, avatarUrl }) => {
    const userAuth = await firebaseAuth.register(email, password, displayName, avatarUrl);
    return userAuth;
})


export const checkuserAuth = createAsyncThunk('userAuth/checkuserAuth', async () => {
    const response = await firebaseAuth.checkUser();
    return response
})

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(checkuserAuth.fulfilled, (state, action) => {
                state.userAuth = action.payload;
                console.log(action.payload)
                state.status = "succeeded"
                setTimeout(() => {
                    store.dispatch(unSetLoading())
                }, 10);

            })
            .addCase(checkuserAuth.pending, (state) => {
                state.status = "loading"
                setTimeout(() => {
                    store.dispatch(setLoading())
                }, 10);
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(action, 'qweqwe')
                console.log(action)
                state.userAuth = action.payload;
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
                state.userAuth = action.payload;
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
                state.userAuth = null;
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


export default userAuthSlice.reducer