import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  details: null,
  id: null,
  firstName: "",
  lastName: "",
  username: "",
  avatar: "",
  banner: "",
  location: "",
  about: "",
  email: "",
  phone: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.details = null;
      state.id = null;
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.avatar = "";
      state.banner = "";
      state.location = "";
      state.about = "";
      state.email = "";
      state.phone = "";
      state.loading = false;
      state.error = null;
    },
    loadUserDetails: (state, action) => {
      state.details = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAllInformation(state, action) {
      const {
        id,
        firstName,
        lastName,
        username,
        avatar,
        banner,
        location,
        about,
        phone,
        email,
      } = action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.username = username;
      state.avatar = avatar;
      state.banner = banner;
      state.location = location;
      state.about = about;
      state.phone = phone;
      state.email = email;
    },
  },
});

export const { login, logout, loadUserDetails, setEmail, setAllInformation } =
  userSlice.actions;
export default userSlice.reducer;
