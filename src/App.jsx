import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
  useParams,
} from "react-router-dom";
// import { Routes, Route } from 'react-router-dom';
import TabelPembelajaran from "./pages/Guru/TabelPembelajaran";
// import { appNavs } from './config';
// import Frame from './components/Frame/Frame';
import Layout from "./components/layout";
import TujuanPembelajaran from "./pages/Guru/TujuanPembelajaran";
import AnalisisPembelajaran from "./pages/Guru/AnalisisPembelajaran";
import ErrorPage from "./pages/ErrorPage";
import TambahSiswa from "./pages/Admin/Siswa/TambahSiswa";
import PilihKelas from "./pages/Admin/Kelas/PilihKelas";
import TambahKelas from "./pages/Admin/Kelas/TambahKelas";
import DaftarSiswa from "./pages/Admin/Siswa/DaftarSiswa";
import UpdateSiswa from "./pages/Admin/Siswa/UpdateSiswa";
import DaftarMapel from "./pages/Admin/Mata-Pelajaran/DaftarMapel";
import TambahMapel from "./pages/Admin/Mata-Pelajaran/TambahMapel";
import UpdateMapel from "./pages/Admin/Mata-Pelajaran/UpdateMapel";
import PilihSiswa from "./pages/Admin/Kelas/PilihSiswa";
import DaftarGuru from "./pages/Admin/Guru/DaftarGuru";
import PilihPegawai from "./pages/Admin/Guru/PilihPegawai";
import AuthMiddleware from "./middleware/AuthMiddleware";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import LupaPassword from "./pages/Auth/LupaPassword";
import DaftarTahunAjaran from "./pages/Admin/Tahun-Ajaran/DaftarTahunAjaran";
import TambahTahunAjaran from "./pages/Admin/Tahun-Ajaran/TambahTahunAjaran";
import UpdateTahunAjaran from "./pages/Admin/Tahun-Ajaran/UpdateTahunAjaran";
import DaftarTujuanPembelajaran from "./pages/Admin/TujuanPembelajaran/DaftarTujuanPembelajaran";
import TambahTujuanPembelajaran from "./pages/Admin/TujuanPembelajaran/TambahTujuanPembelajaran";
import UpdateTujuanPembelajaran from "./pages/Admin/TujuanPembelajaran/UpdateTujuanPembelajaran";

function App() {
  const { idSiswa } = useParams()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/lupa-password",
      element: <LupaPassword />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/guru",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/guru/tujuan-pembelajaran",
          element: <AuthMiddleware component={TujuanPembelajaran} auth="guru" />
        },
        {
          path: "/guru/tabel-pembelajaran",
          element: <AuthMiddleware component={TabelPembelajaran} auth="guru" />
        },
        {
          path: "/guru/analisis-pembelajaran",
          element: <AuthMiddleware component={AnalisisPembelajaran} auth="guru" />
        },
      ]
    },
    {
      path: "/admin",
      element: <AuthMiddleware component={Layout} auth={"admin"} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/admin/daftar-siswa",
          element: <AuthMiddleware component={DaftarSiswa} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/tambah-siswa",
          element: <AuthMiddleware component={TambahSiswa} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/edit-siswa/:idSiswa",
          element: <AuthMiddleware component={UpdateSiswa} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/pilih-kelas",
          element: <AuthMiddleware component={PilihKelas} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/pilih-siswa/:idSiswa",
          element: <AuthMiddleware component={PilihSiswa} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/tambah-kelas",
          element: <AuthMiddleware component={TambahKelas} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/daftar-mapel",
          element: <AuthMiddleware component={DaftarMapel} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/tambah-mapel",
          element: <AuthMiddleware component={TambahMapel} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/edit-mapel/:idMapel",
          element: <AuthMiddleware component={UpdateMapel} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/daftar-guru",
          element: <AuthMiddleware component={DaftarGuru} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/pilih-pegawai",
          element: <AuthMiddleware component={PilihPegawai} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/daftar-tahun-ajaran",
          element: <AuthMiddleware component={DaftarTahunAjaran} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/tambah-tahun-ajaran",
          element: <AuthMiddleware component={TambahTahunAjaran} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/edit-tahun-ajaran/:idTahunAjaran",
          element: <AuthMiddleware component={UpdateTahunAjaran} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/daftar-tujuan-pembelajaran",
          element: <AuthMiddleware component={DaftarTujuanPembelajaran} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/tambah-tujuan-pembelajaran",
          element: <AuthMiddleware component={TambahTujuanPembelajaran} auth="admin" />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/admin/edit-tujuan-pembelajaran/:idTujuanPembelajaran",
          element: <AuthMiddleware component={UpdateTujuanPembelajaran} auth="admin" />,
          errorElement: <ErrorPage />,
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
    // <Routes>
    //   <Route path="/guru" element={<Layout />}>
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //     <Route path="" element={<AuthMiddleware component={} />} />
    //   </Route>
    // </Routes>
    // <>
    //   <Routes>
    //     <Route path="/" element={<Frame navs={appNavs} />}>
    //       <Route index element={<TablePembelajaran />} />
    //       <Route path="dashboard" element={<DashboardPage />} />
    //       <Route path="table-members" element={<MembersPage />} />
    //       <Route path="table-virtualized" element={<VirtualizedTablePage />} />
    //       <Route path="error-404" element={<Error404Page />} />
    //       <Route path="error-403" element={<Error403Page />} />
    //       <Route path="error-500" element={<Error500Page />} />
    //       <Route path="error-503" element={<Error503Page />} />
    //       <Route path="sign-in" element={<SignInPage />} />
    //       <Route path="sign-up" element={<SignUpPage />} />
    //       <Route path="form-basic" element={<FormBasicPage />} />
    //       <Route path="form-wizard" element={<FormWizardPage />} />
    //       <Route path="calendar" element={<CalendarPage />} />
    //     </Route>
    //     <Route path="*" element={<Error404Page />} />
    //   </Routes>
    // </>
  )
}

export default App
