import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

export const fetchBooksThunk = createAsyncThunk(
  "books/fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("books");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const addBookThunk = createAsyncThunk(
  "books/addBook",
  async (book, thunkApi) => {
    try {
      const { data } = await axios.post("books", book);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateBookThunk = createAsyncThunk(
  "books/updateBook",
  async (book, thunkApi) => {

    try {
      const { data } = await axios.put(`books/${book.isbn}`, book);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const deleteBookThunk = createAsyncThunk(
  "books/deleteBook",
  async (bookISBN, thunkApi) => {
    console.log(bookISBN);
    
    try {
      const { data } = await axios.delete(`books/${bookISBN}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
