import loginSlice from "./loginSlice";
import registerSlice from "./registerSlice";
import siswaSlice from "./siswaSlice";
import plotSiswaSlice from "./plotSiswaSlice";
import kelasSlice from "./kelasSlice";
import mapelSlice from "./mapelSlice";

const rootReducer = {
  loginSlice,
  registerSlice,
  kelasSlice,
  siswaSlice,
  plotSiswaSlice,
  mapelSlice
};
export default rootReducer;