import {  configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./features/books/books.slice";
import { commentsReducer } from "./features/comments/comments.slice";

export const store = configureStore({
    reducer:{
        books:bookReducer,
        comments:commentsReducer
    }
})