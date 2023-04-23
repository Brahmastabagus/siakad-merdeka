import PeoplesIcon from '@rsuite/icons/Peoples';

const Admin = [
  {
    id: "1",
    title: "Siswa",
    // route: "/juri/guru",
    icon: PeoplesIcon,
    child: [
      {
        // id: "1-1",
        id: "Daftar Siswa",
        childtitle: "Daftar Siswa",
        childlink: "/admin/daftar-siswa",
      },
      {
        // id: "1-1",
        id: "Tambah Siswa",
        childtitle: "Tambah Siswa",
        childlink: "/admin/tambah-siswa",
      },
      {
        // id: "1-1",
        id: "Pilih Kelas",
        childtitle: "Pilih Kelas",
        childlink: "/admin/pilih-kelas",
      },
      {
        // id: "1-1",
        id: "Tambah Kelas",
        childtitle: "Tambah Kelas",
        childlink: "/admin/tambah-kelas",
      },
    ]
  },
];

export default Admin;
