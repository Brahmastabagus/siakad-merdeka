import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

const arr = window.location.href.split("/")
// console.log(arr[arr.length - 1]);
const locations = arr[4]?.split("-") ?? ["dashboard", "tahun ajaran"]
for (var i = 0; i < locations.length; i++) {
  locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
}

const location = locations.join(" ")

const tahunAjaranAPI = `${import.meta.env.VITE_API}/tahun-ajaran`

export const getTahunAjaran = createAsyncThunk("tahunAjaran/getTahunAjaran", async () => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(tahunAjaranAPI, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const json = await response.json()

  return json
})

export const setTahunAjaran = createAsyncThunk("tahunAjaran/setTahunAjaran", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(tahunAjaranAPI,
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

export const updateTahunAjaran = createAsyncThunk("tahunAjaran/updateTahunAjaran", async (data) => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${tahunAjaranAPI}/${data.id}`,
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

export const deleteTahunAjaran = createAsyncThunk("tahunAjaran/deleteTahunAjaran", async (id) => {
  const cookies = new Cookies()
  let token = cookies.get("token")

  const response = await fetch(`${tahunAjaranAPI}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  })
  const json = await response.json()

  return id
})

const tahunAjaranEntity = createEntityAdapter({
  selectId: (tahunAjaran) => tahunAjaran.id
})

const tahunAjaranSlice = createSlice({
  name: "tahunAjaran",
  initialState: {
    title: location,
    ...tahunAjaranEntity.getInitialState()
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTahunAjaran.fulfilled, (state, action) => {
        tahunAjaranEntity.setAll(state, action.payload)
      })
      .addCase(setTahunAjaran.fulfilled, (state, action) => {
        tahunAjaranEntity.addOne(state, action.payload)
      })
      .addCase(updateTahunAjaran.fulfilled, (state, action) => {
        tahunAjaranEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
      })
      .addCase(deleteTahunAjaran.fulfilled, (state, action) => {
        tahunAjaranEntity.removeOne(state, action.payload)
      })
  }
})

export const tahunAjaranSelector = tahunAjaranEntity.getSelectors(state => state.tahunAjaranSlice)

export const { update } = tahunAjaranSlice.actions
export default tahunAjaranSlice.reducer