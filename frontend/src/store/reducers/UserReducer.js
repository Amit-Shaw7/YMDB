import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null,
}


export const UserReducer = createReducer(initialState, {
    // Load User
    LOAD_USER_SUCCESS: (state, action) => {
        state.user = action?.payload;
        state.isAuthenticated = true;
        state.loading = false;
    },
    LOAD_USER_FAILED: (state) => {
        state.user = null;
        state.loading = false;
    },

    // Authentication
    LOGIN_SUCCESS: (state, action) => {
        state.user = action?.payload;
        state.loading = false;
        state.isAuthenticated = true;
    },
    LOGIN_FAILED: (state) => {
        state.user = {};
        state.loading = false;
    },


    SIGNUP_SUCCESS: (state, action) => {
        state.loading = false;
    },
    SIGNUP_FAILED: (state) => {
        state.loading = false;
    },

    LOGOUT_SUCCESS: (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
    },

    FETCH_ALL_FAVOURITE_MOVIES: (state, action) => {
        state.favourites = action?.payload;
    },

    ADD_TO_FAV: (state, action) => {
        state.favourites = [...state.favourites, { ...action?.payload }]
    },
    REMOVE_FROM_FAV: (state, action) => {
        state.favourites = state?.favourites?.filter((movie) => movie.movieId !== action?.payload)
    },

    // For Loading
    LOADING_START: (state) => {
        state.loading = true;
    },
    LOADING_END: (state) => {
        state.loading = false;
    }
});