import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addBookThunk,
  deleteBookThunk,
  fetchBooksThunk,
  updateBookThunk,
} from "./operations";

const initialState = {
  books: [],
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "books",
  initialState,
  selectors: {
    selectBooks: (state) => state.books,
    selectIsLoading: (state) => state.isLoading,
    selectIsError: (state) => state.isError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.fulfilled, (state, { payload }) => {
        state.books = payload;
      })
      .addCase(addBookThunk.fulfilled, (state, { payload }) => {
        state.books.push(payload.newBook);
      })
      .addCase(updateBookThunk.fulfilled, (state, { payload }) => {
        const updatedBookIndex = state.books.findIndex(
          (book) => book.isbn === payload.book.isbn
        );
        state.books[updatedBookIndex] = { ...payload.book };
      })
      .addCase(deleteBookThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        
        state.books = state.books.filter((book) => book.isbn !== payload);
      })
      .addMatcher(
        isAnyOf(
          fetchBooksThunk.pending,
          addBookThunk.pending,
          updateBookThunk.pending
        ),
        (state) => {
          state.error = false;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBooksThunk.rejected,
          addBookThunk.rejected,
          updateBookThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBooksThunk.fulfilled,
          addBookThunk.fulfilled,
          updateBookThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const bookReducer = slice.reducer;
export const { selectBooks, selectIsLoading, selectIsError } = slice.selectors;
