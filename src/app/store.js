import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import usersReducer from "../features/users/UserPage"


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: usersReducer
    },
    middleware: getDefaultMiddleWare => 
            getDefaultMiddleWare().concat(apiSlice.middleware)
})