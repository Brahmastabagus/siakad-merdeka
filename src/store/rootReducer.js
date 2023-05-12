import loginSlice from "./loginSlice";
import registerSlice from "./registerSlice";
import siswaSlice from "./siswaSlice";
import plotSiswaSlice from "./plotSiswaSlice";
import kelasSlice from "./kelasSlice";
import mapelSlice from "./mapelSlice";
import tahunAjaranSlice from './tahunAjaranSlice'
import tujuanPembelajaranSlice from './tujuanPembelajaranSlice'
import profileSlice from './profileSlice'

const rootReducer = {
  loginSlice,
  registerSlice,
  kelasSlice,
  siswaSlice,
  plotSiswaSlice,
  mapelSlice,
  tahunAjaranSlice,
  tujuanPembelajaranSlice,
  profileSlice
};
export default rootReducer;