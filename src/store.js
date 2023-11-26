import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./features/bookings/bookingsSlice";

export default configureStore({
    reducer: {
        bookings: bookingsReducer,
    }
})