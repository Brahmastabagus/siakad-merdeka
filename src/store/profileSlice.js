import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'universal-cookie';

const arr = window.location.href.split("/")
// console.log(arr[arr.length - 1]);
const locations = arr[4]?.split("-") ?? ["dashboard", "profile"]
for (var i = 0; i < locations.length; i++) {
  locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
}

const location = locations.join(" ")

const profileAPI = `${import.meta.env.VITE_API}/profile`

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(profileAPI, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  // console.log(response.data);

  return json
})

const profileEntity = createEntityAdapter({
  selectId: (profile) => profile.id
})

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    title: location,
    ...profileEntity.getInitialState()
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        profileEntity.setAll(state, action.payload)
      })
  }
})

export const profileSelector = profileEntity.getSelectors(state => state.profileSlice)

export const { update } = profileSlice.actions
export default profileSlice.reducer