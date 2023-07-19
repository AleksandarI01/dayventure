import { createSlice } from "@reduxjs/toolkit";
//import { v4 as uuid } from 'uuid'

const initialState = {
  tripName: "",
  activityName: "",
  placeId: "",
  startTime: "",
  endTime: "",
  meetingPoint: "",
  lat: 0,
  lng: 0,
  formattedAddress: "",
  phoneNumber: "",
  photos: "",
  openingHours: [],
  endTime: "",
  description: "",
  createdBy: "",
  categories: [],
  rating: 0,
  website: "",
  dayOfTrip: "",
  tripSteps: [],
};

const newTripSlice = createSlice({
  name: "newTrip",
  initialState,
  reducers: {
    add_trip: (state, action) => {
      state.placeId = action.payload.placeId;
      state.activityName = action.payload.activityName;
      state.tripName = action.payload.tripName;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.dayOfTrip = action.payload.dayOfTrip;
      state.meetingPoint = action.payload.meetingPoint;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.formattedAddress = action.payload.formattedAddress;
      state.phoneNumber = action.payload.phoneNumber;
      state.photos = action.payload.photos;
      state.categories = action.payload.categories;
      state.rating = action.payload.rating;
      state.website = action.payload.website;
      state.openingHours = action.payload.openingHours;

      console.log(action.payload, "ACTION");
    },
  },
});

export const { add_trip } = newTripSlice.actions;
export default newTripSlice.reducer;
