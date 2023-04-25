import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const arr = window.location.href.split("/")
// console.log(arr[arr.length - 1]);
const locations = arr[4]?.split("-") ?? ["dashboard", "mapel"]
for (var i = 0; i < locations.length; i++) {
  locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
}

const location = locations.join(" ")

const mapelAPI = `${import.meta.env.VITE_API}/mata-pelajaran`

export const getMapel = createAsyncThunk("mapel/getMapel", async () => {
  const response = await fetch(mapelAPI)
  const json = await response.json()

  return json
})

export const setMapel = createAsyncThunk("mapel/setMapel", async (data) => {
  const response = await fetch(mapelAPI,
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

export const updateMapel = createAsyncThunk("mapel/updateMapel", async (data) => {
  const response = await fetch(`${mapelAPI}/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

  const json = await response.json()

  return json
})

export const deleteMapel = createAsyncThunk("mapel/deleteMapel", async (id) => {
  const response = await fetch(`${mapelAPI}/${id}`, {
    method: "DELETE"
  })
  const json = await response.json()

  return id
})

const mapelEntity = createEntityAdapter({
  selectId: (mapel) => mapel.id
})

const mapelSlice = createSlice({
  name: "mapel",
  initialState: {
    title: location,
    ...mapelEntity.getInitialState()
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMapel.fulfilled, (state, action) => {
        mapelEntity.setAll(state, action.payload)
      })
      .addCase(setMapel.fulfilled, (state, action) => {
        mapelEntity.addOne(state, action.payload)
      })
      .addCase(updateMapel.fulfilled, (state, action) => {
        mapelEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(deleteMapel.fulfilled, (state, action) => {
        mapelEntity.removeOne(state, action.payload)
      })
  }
})

export const mapelSelector = mapelEntity.getSelectors(state => state.mapelSlice)

export const { update } = mapelSlice.actions
export default mapelSlice.reducer