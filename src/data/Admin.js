import PeoplesIcon from '@rsuite/icons/Peoples';
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import PageIcon from '@rsuite/icons/Page';

const Admin = [
  {
    id: "1",
    title: "Siswa",
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
        id: "Tambah Siswa",
        childtitle: "Tambah Siswa",
        childlink: "/admin/tambah-siswa",
      },
    ]
  },
  {
    id: "2",
    title: "Kelas",
    // route: "/juri/guru",
    icon: PeoplesIcon,
    child: [
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
  {
    id: "3",
    title: "Mapel",
    // route: "/juri/guru",
    icon: PageIcon,
    child: [
      {
        // id: "1-1",
        id: "Daftar Mapel",
        childtitle: "Daftar Mapel",
        childlink: "/admin/daftar-mapel",
      },
    ]
  },
];

export default Admin;
