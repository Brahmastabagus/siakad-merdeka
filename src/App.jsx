import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
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

function App() {
  const {idSiswa} = useParams()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/guru",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/guru/tujuan-pembelajaran",
          element: <TujuanPembelajaran />
        },
        {
          path: "/guru/tabel-pembelajaran",
          element: <TabelPembelajaran />
        },
        {
          path: "/guru/analisis-pembelajaran",
          element: <AnalisisPembelajaran />
        },
      ]
    },
    {
      path: "/admin",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/admin/daftar-siswa",
          element: <DaftarSiswa />
        },
        {
          path: "/admin/tambah-siswa",
          element: <TambahSiswa />
        },
        {
          path: "/admin/edit-siswa/:idSiswa",
          element: <UpdateSiswa />
        },
        {
          path: "/admin/pilih-kelas",
          element: <PilihKelas />
        },
        {
          path: "/admin/tambah-kelas",
          element: <TambahKelas />
        },
        {
          path: "/admin/daftar-mapel",
          element: <DaftarMapel />
        },
        {
          path: "/admin/tambah-mapel",
          element: <TambahMapel />
        },
        {
          path: "/admin/edit-mapel/:idMapel",
          element: <UpdateMapel />
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
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
