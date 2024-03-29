import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false
            state.error = null
        },
        signInError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.currentUser = action.payload
        },
        updateUserError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        deleteUserStart: (state) => {
            state.loading = true
        },
        deleteUserSuccess: (state) => {
            state.loading = false
            state.error = null
            state.currentUser = null
        },
        deleteUserError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        signOutUserStart: (state) => {
            state.loading = true
        },
        signOutUserSuccess: (state) => {
            state.loading = false
            state.error = null
            state.currentUser = null
        },
        signOutUserError: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
});

export const {signInStart, signInSuccess, signInError,
    updateUserError, updateUserStart, updateUserSuccess,
    deleteUserStart, deleteUserSuccess, deleteUserError,
    signOutUserStart, signOutUserError, signOutUserSuccess} = userSlice.actions

export default userSlice.reducer;