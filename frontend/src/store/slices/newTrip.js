import { createSlice } from "@reduxjs/toolkit";
//import { v4 as uuid } from 'uuid'

const initialState = {
  tripName: "",
  startTime: "",
  endTime: "",
  description: "",
  createdBy: "",
  categories: [],
  rating: 0,
  dayOfTrip: "",
  tripSteps: [],
};

const newTripSlice = createSlice({
  name: "newTrip",
  initialState,
  reducers: {
    add_trip: (state, action) => {
      state.tripName = action.payload.tripName;
      state.startTime = action.payload.startTime;
      state.dayOfTrip = action.payload.dayOfTrip;
      // state.description = action.payload
      console.log(action.payload, "ACTION");
    },
  },
});

export const { add_trip } = newTripSlice.actions;
export default newTripSlice.reducer;
