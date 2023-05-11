import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// const arr = window.location.href.split("/")
// // console.log(arr[arr.length - 1]);
// const locations = arr[4]?.split("-") ?? ["dashboard", "kelas"]
// for (var i = 0; i < locations.length; i++) {
//   locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
// }

// const location = locations.join(" ")

const loginAPI = `${import.meta.env.VITE_API}/login`

export const getLogin = createAsyncThunk("login/getLogin", async (data) => {
  const response = await fetch(loginAPI,
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

const loginEntity = createEntityAdapter({
  selectId: (login) => login.id
})

const loginSlice = createSlice({
  name: "login",
  initialState: {
    // title: location,
    ...loginEntity.getInitialState()
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.fulfilled, (state, action) => {
        loginEntity.setAll(state, action.payload)
      })
      .addCase(getLogin.rejected, (state, action) => {
        loginEntity.setAll(state, action.payload)
        console.log(state, action.payload);
      })
  }
})

export const loginSelector = loginEntity.getSelectors(state => state.loginSlice)

export const { update } = loginSlice.actions
export default loginSlice.reducer