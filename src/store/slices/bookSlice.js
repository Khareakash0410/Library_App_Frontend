import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers: {
       fetchBooksRequest(state) {
         state.loading = true;
         state.error = null;
         state.message = null;
       },
       fetchBooksSuccess(state, action) {
        state.loading = false;
        state.books = action.payload;
       },
       fetchBooksFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
       },
       addBookRequest(state) {
         state.loading = true;
         state.error = null;
         state.message = null;
       },
       addBookSuccess(state, action) {
        state.loading = false;
        state.message = action.payload;
       },
       addBookFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
       },
       deleteBookRequest(state) {
         state.loading = true;
         state.error = null;
         state.message = null;
       },
       deleteBookSuccess(state, action) {
        state.loading = false;
        state.message = action.payload.message;
        state.books = state.books.filter((book) => book._id !== action.payload.bookId)
       },
       deleteBookFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
       },

       resetBookSlice(state) {
        state.error = null;
        state.message = null;
        state.loading = false;
       },
       
    },
});


export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  await axios.get("https://library-app-272e.onrender.com/api/v1/book/all", {
    withCredentials: true
  }).then(res => {
    dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
  }).catch(err => {
    dispatch(bookSlice.actions.fetchBooksFailed(err.response.data.message));
  })
};

export const addBook = (data) => async (dispatch) => {
 dispatch(bookSlice.actions.addBookRequest());
 await axios.post("https://library-app-272e.onrender.com/api/v1/book/add", data, {withCredentials: true, headers: {
    "Content-Type": "application/json"
 }}).then(res => {
    dispatch(bookSlice.actions.addBookSuccess(res.data.message));
    dispatch(toggleAddBookPopup());
 }).catch(err => {
    dispatch(bookSlice.actions.addBookFailed(err.response.data.message));
 })
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export const deleteBook = (bookId) => async (dispatch) => {
 dispatch(bookSlice.actions.deleteBookRequest());
 await axios.delete(`https://library-app-272e.onrender.com/api/v1/book/delete/${bookId}`, {withCredentials: true, headers: {
   "Content-Type": "application/json"
 }}).then(res => {
  dispatch(bookSlice.actions.deleteBookSuccess({message: res.data.message, bookId}));
 }).catch(err => {
  dispatch(bookSlice.actions.deleteBookFailed(err.response.data.message));
 })
};

export default bookSlice.reducer;