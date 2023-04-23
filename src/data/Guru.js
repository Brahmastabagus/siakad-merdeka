import DetailIcon from '@rsuite/icons/Detail';

const Guru = [
  {
    id: "1",
    title: "Instrumen 1",
    // route: "/juri/guru",
    icon: DetailIcon,
    child: [
      {
        // id: "1-1",
        id: "Tujuan Pembelajaran",
        childtitle: "Tujuan Pembelajaran",
        childlink: "/guru/tujuan-pembelajaran",
      },
      {
        // id: "1-2",
        id: "Tabel Pembelajaran",
        childtitle: "Tabel Pembelajaran",
        childlink: "/guru/tabel-pembelajaran",
      },
      {
        // id: "1-3",
        id: "Analisis Pembelajaran",
        childtitle: "Analisis Pembelajaran",
        childlink: "/guru/analisis-pembelajaran",
      },
      {
        // id: "1-4",
        id: "Kriteria Ketuntasan",
        childtitle: "Kriteria Ketuntasan",
        childlink: "/guru/kriteria-ketuntasan",
      },
    ]
  },
];

// const Guru = [
//   {
//     eventKey: "instrumen-1",
//     title: "Instrumen 1",
//     // route: "/juri/guru",
//     icon: DetailIcon,
//     children: [
//       {
//         // id: "1-1",
//         eventKey: "tujuan-pembelajaran",
//         title: "Tujuan Pembelajaran",
//         to: "/tujuan-pembelajaran",
//       },
//       {
//         // eventKey: "1-2",
//         eventKey: "tabel-pembelajaran",
//         title: "Tabel Pembelajaran",
//         to: "/tabel-pembelajaran",
//       },
//       {
//         // eventKey: "1-3",
//         eventKey: "analisis-pembelajaran",
//         title: "Analisis Pembelajaran",
//         to: "/analisis-pembelajaran",
//       },
//       {
//         // eventKey: "1-4",
//         eventKey: "kriteria-ketuntasan",
//         title: "Kriteria Ketuntasan",
//         to: "/kriteria-ketuntasan",
//       },
//     ]
//   },
// ];

export default Guru;
