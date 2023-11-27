import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://booking-system-api-leejunsheng7.sigma-school-full-stack.repl.co"

//Async thunk for fetching a user's bookings
export const fetchBookingsByUser = createAsyncThunk(
    "bookings/fetchByUser",
    async (uid) => {
        const response = await axios.get(`${BASE_URL}/booking/${uid}`)
        return response.data;
    }
)

//Async thunk for creating a new booking
export const createBooking = createAsyncThunk(
    "bookings/create",
    async (data) => {
        const response = await axios.post(`${BASE_URL}/booking`, data)
        return response.data;
    }
)

//Async thunk for delete the booking
export const deleteBooking = createAsyncThunk(
    "bookings/delete",
    async (id) => {
        await axios.delete(`${BASE_URL}/booking/${id}`)
        return id;
    }
)

//Async thunk for updating the booking
export const updateBooking = createAsyncThunk(
    "bookings/update",
    async ({id, data}) => {
        const response = await axios.put(`${BASE_URL}/booking/${id}`, data)
        return response.data;
    }
)

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {bookings: [], loading: true, loading2: false},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookingsByUser.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        })
        builder.addCase(createBooking.fulfilled, (state, action) => {
            state.bookings = [action.payload, ...state.bookings];
            state.loading2 = false;
        })
        builder.addCase(createBooking.pending, (state) => {
            state.loading2 = true;
        })
        builder.addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookings = state.bookings.filter((booking) => booking.id !== action.payload)
        })
        builder.addCase(updateBooking.fulfilled, (state, action) => {
            state.bookings = state.bookings.map((booking) => {
                return booking.id === action.payload.id ? action.payload : booking
            })
        })
    }
})

const bookingsReducer = bookingsSlice.reducer;
export default bookingsReducer;
