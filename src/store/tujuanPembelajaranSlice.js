import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

const arr = window.location.href.split("/")
// console.log(arr[arr.length - 1]);
const locations = arr[4]?.split("-") ?? ["dashboard", "tahun ajaran"]
for (var i = 0; i < locations.length; i++) {
  locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
}

const location = locations.join(" ")

const tujuanPembelajaranAPI = `${import.meta.env.VITE_API}/tujuan-pembelajaran`

export const getTujuanPembelajaran = createAsyncThunk("tujuanPembelajaran/getTujuanPembelajaran", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(tujuanPembelajaranAPI, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setTujuanPembelajaran = createAsyncThunk("tujuanPembelajaran/setTujuanPembelajaran", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(tujuanPembelajaranAPI,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

  const json = await response.json()

  return json
})

export const updateTujuanPembelajaran = createAsyncThunk("tujuanPembelajaran/updateTujuanPembelajaran", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${tujuanPembelajaranAPI}/${data.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

  const json = await response.json()

  return json
})

export const deleteTujuanPembelajaran = createAsyncThunk("tujuanPembelajaran/deleteTujuanPembelajaran", async (id) => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${tujuanPembelajaranAPI}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  })
  const json = await response.json()

  return id
})

const tujuanPembelajaranEntity = createEntityAdapter({
  selectId: (tujuanPembelajaran) => tujuanPembelajaran.id
})

const tujuanPembelajaranSlice = createSlice({
  name: "tujuanPembelajaran",
  initialState: {
    title: location,
    ...tujuanPembelajaranEntity.getInitialState()
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTujuanPembelajaran.fulfilled, (state, action) => {
        tujuanPembelajaranEntity.setAll(state, action.payload)
      })
      .addCase(setTujuanPembelajaran.fulfilled, (state, action) => {
        tujuanPembelajaranEntity.addOne(state, action.payload)
      })
      .addCase(updateTujuanPembelajaran.fulfilled, (state, action) => {
        tujuanPembelajaranEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(deleteTujuanPembelajaran.fulfilled, (state, action) => {
        tujuanPembelajaranEntity.removeOne(state, action.payload)
      })
  }
})

export const tujuanPembelajaranSelector = tujuanPembelajaranEntity.getSelectors(state => state.tujuanPembelajaranSlice)

export const { update } = tujuanPembelajaranSlice.actions
export default tujuanPembelajaranSlice.reducer