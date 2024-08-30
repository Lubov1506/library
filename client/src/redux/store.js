import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./books/slice";


export const store = configureStore({
    reducer:{
        books: bookReducer
    }
})