import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const arr = window.location.href.split("/")
// console.log(arr[arr.length - 1]);
const locations = arr[arr.length - 1].split("-")
for (var i = 0; i < locations.length; i++) {
  locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
}

const location = locations.join(" ")

const kelasAPI = `${import.meta.env.VITE_API}/kelas`

export const getKelas = createAsyncThunk("kelas/getKelas", async () => {
  const response = await fetch(kelasAPI)
  const json = await response.json()

  return json
})

const kelasEntity = createEntityAdapter({
  selectId: (kelas) => kelas.id
})

const kelasSlice = createSlice({
  name: "kelas",
  initialState: {
    title: location,
    ...kelasEntity.getInitialState()
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKelas.fulfilled, (state, action) => {
        kelasEntity.setAll(state, action.payload)
      })
  }
})

export const kelasSelector = kelasEntity.getSelectors(state => state.kelasSlice)

export const { update } = kelasSlice.actions
export default kelasSlice.reducer