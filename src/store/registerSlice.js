import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// const arr = window.location.href.split("/")
// // console.log(arr[arr.length - 1]);
// const locations = arr[4]?.split("-") ?? ["dashboard", "kelas"]
// for (var i = 0; i < locations.length; i++) {
//   locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
// }

// const location = locations.join(" ")

const registerAPI = `${import.meta.env.VITE_API}/register`

export const getRegister = createAsyncThunk("register/getRegister", async (data) => {
  const response = await fetch(registerAPI,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  const json = await response.json()

  return json
})

const registerEntity = createEntityAdapter({
  selectId: (register) => register.id
})

const registerSlice = createSlice({
  name: "register",
  initialState: {
    // title: location,
    ...registerEntity.getInitialState()
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegister.fulfilled, (state, action) => {
        registerEntity.setAll(state, action.payload)
      })
  }
})

export const registerSelector = registerEntity.getSelectors(state => state.registerSlice)

export const { update } = registerSlice.actions
export default registerSlice.reducer