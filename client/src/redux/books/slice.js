import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addBookThunk,
  deleteBookThunk,
  fetchBooksThunk,
  searchBookThunk,
  updateBookThunk,
} from "./operations";

const initialState = {
  books: [],
  searchBooks: [],
  searchMessage: "",
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "books",
  initialState,
  selectors: {
    selectBooks: (state) => state.books,
    selectSearchBooks: (state) => state.searchBooks,
    selectSearchMessage: (state) => state.searchMessage,
    selectIsLoading: (state) => state.isLoading,
    selectIsError: (state) => state.isError,
  },
  reducers: {
    showAllBooks: (state, action) => {
      state.searchBooks = state.books;
      state.searchMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.fulfilled, (state, { payload }) => {
        state.books = payload;
        state.searchBooks = payload;
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
        state.books = state.books.filter((book) => book.isbn !== payload);
      })
      .addCase(searchBookThunk.fulfilled, (state, { payload }) => {
        if (payload.books) {
          state.searchBooks = payload.books;
          state.searchMessage = "";
        } else {
          state.searchBooks = [];
          state.searchMessage = "Not found books";
        }
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
export const { showAllBooks } = slice.actions;
export const {
  selectBooks,
  selectSearchBooks,
  selectSearchMessage,
  selectIsLoading,
  selectIsError,
} = slice.selectors;
