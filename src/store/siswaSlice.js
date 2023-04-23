import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const arr = window.location.href.split("/")
// console.log(arr[arr.length - 1]);
const locations = arr[4].split("-")
for (var i = 0; i < locations.length; i++) {
  locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
}

const location = locations.join(" ")

const siswaAPI = `${import.meta.env.VITE_API}/master/siswa`

export const getSiswa = createAsyncThunk("siswa/getSiswa", async () => {
  const response = await fetch(siswaAPI)
  const json = await response.json()

  return json
})

export const setSiswa = createAsyncThunk("siswa/setSiswa", async (data) => {
  const response = await fetch(siswaAPI,
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

export const updateSiswa = createAsyncThunk("siswa/updateSiswa", async (data) => {
  console.log(data);
  const response = await fetch(`${siswaAPI}/${data.id}`,
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

export const deleteSiswa = createAsyncThunk("siswa/deleteSiswa", async (id) => {
  const response = await fetch(`${siswaAPI}/${id}`, {
    method: "DELETE"
  })
  const json = await response.json()

  return id
})

const siswaEntity = createEntityAdapter({
  selectId: (siswa) => siswa.id
})

const siswaSlice = createSlice({
  name: "siswa",
  initialState: {
    title: location,
    ...siswaEntity.getInitialState()
  },
  reducers: {
    update: (state, action) => {
      state.title = action.payload.title
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSiswa.fulfilled, (state, action) => {
        siswaEntity.setAll(state, action.payload)
      })
      .addCase(setSiswa.fulfilled, (state, action) => {
        siswaEntity.addOne(state, action.payload)
      })
      .addCase(updateSiswa.fulfilled, (state, action) => {
        siswaEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
      })
      .addCase(deleteSiswa.fulfilled, (state, action) => {
        siswaEntity.removeOne(state, action.payload)
      })
  }
})

export const siswaSelector = siswaEntity.getSelectors(state => state.siswaSlice)

export const { update } = siswaSlice.actions
export default siswaSlice.reducer