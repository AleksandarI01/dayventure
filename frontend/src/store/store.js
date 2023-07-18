import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import newTripReducer from "./slices/newTrip"

export const store = configureStore({
  reducer: {
    user: userReducer,
    newTrip: newTripReducer,
  },
});
