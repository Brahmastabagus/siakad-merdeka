import PeoplesIcon from '@rsuite/icons/Peoples';
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import PageIcon from '@rsuite/icons/Page';
import CreativeIcon from '@rsuite/icons/Creative';

// const Admin = [
//   {
//     id: "Siswa",
//     title: "Siswa",
//     // route: "/juri/guru",
//     icon: UserBadgeIcon,
//     child: [
//       {
//         // id: "1-1",
//         id: "Daftar Siswa",
//         childtitle: "Daftar Siswa",
//         childlink: "/admin/daftar-siswa",
//       },
//       {
//         // id: "1-1",
//         id: "Tambah Siswa",
//         childtitle: "Tambah Siswa",
//         childlink: "/admin/tambah-siswa",
//       },
//     ]
//   },
//   {
//     id: "Kelas",
//     title: "Kelas",
//     // route: "/juri/guru",
//     icon: PeoplesIcon,
//     child: [
//       {
//         // id: "1-1",
//         id: "Pilih Kelas",
//         childtitle: "Pilih Kelas",
//         childlink: "/admin/pilih-kelas",
//       },
//       {
//         // id: "1-1",
//         id: "Tambah Kelas",
//         childtitle: "Tambah Kelas",
//         childlink: "/admin/tambah-kelas",
//       },
//     ]
//   },
//   {
//     id: "Mapel",
//     title: "Mapel",
//     // route: "/juri/guru",
//     icon: PageIcon,
//     child: [
//       {
//         // id: "1-1",
//         id: "Daftar Mapel",
//         childtitle: "Daftar Mapel",
//         childlink: "/admin/daftar-mapel",
//       },
//     ]
//   },
//   {
//     id: "Guru",
//     title: "Guru",
//     // route: "/juri/guru",
//     icon: CreativeIcon,
//     child: [
//       {
//         // id: "1-1",
//         id: "Daftar Guru",
//         childtitle: "Daftar Guru",
//         childlink: "/admin/daftar-guru",
//       },
//     ]
//   },
// ];
const Admin = [
  {
    id: "User",
    title: "User",
    // route: "/juri/guru",
    icon: UserBadgeIcon,
    child: [
      {
        // id: "1-1",
        id: "Daftar User",
        childtitle: "Daftar User",
        childlink: "/admin/daftar-user",
      },
      {
        // id: "1-1",
        id: "Role User",
        childtitle: "Tambah User",
        childlink: "/admin/daftar-role",
      },
    ]
  },
  {
    id: "Data Dapodik",
    title: "Data Dapodik",
    // route: "/juri/guru",
    icon: UserBadgeIcon,
    child: [
      {
        // id: "1-1",
        id: "Daftar Siswa",
        childtitle: "Daftar Siswa",
        childlink: "/admin/daftar-siswa",
      },
      {
        // id: "1-1",
        id: "Daftar Kelas",
        childtitle: "Daftar Kelas",
        childlink: "/admin/daftar-kelas",
      },
    ]
  },
  {
    id: "Tahun Ajaran",
    title: "Tahun Ajaran",
    // route: "/juri/guru",
    icon: UserBadgeIcon,
    child: [
      {
        // id: "1-1",
        id: "Daftar Tahun Ajaran",
        childtitle: "Daftar Tahun Ajaran",
        childlink: "/admin/daftar-tahun-ajaran",
      },
      {
        // id: "1-1",
        id: "Mata Pelajaran",
        childtitle: "Mata Pelajaran",
        childlink: "/admin/daftar-mapel",
      },
      {
        // id: "1-1",
        id: "Tujuan Pembelajaran",
        childtitle: "Mata Pelajaran",
        childlink: "/admin/daftar-mapel",
      },
    ]
  },
];

export default Admin;
