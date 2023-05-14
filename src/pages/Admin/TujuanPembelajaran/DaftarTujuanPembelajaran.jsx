import React from 'react'
import { Table, Pagination, Stack, InputGroup, Input, DOMHelper, Panel, Breadcrumb, Button, IconButton, Modal } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTujuanPembelajaran, getTujuanPembelajaran, tujuanPembelajaranSelector } from '../../../store/tujuanPembelajaranSlice';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import Cookies from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DaftarTujuanPembelajaran = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [defaultData, setDefaultData] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const navigate = useNavigate();
  // const kelasAPI = `${import.meta.env.VITE_API}/master/tujuanPembelajaran`

  // const dataAPI = async () => {
  //   const response = await fetch(kelasAPI)
  //   const json = await response.json()
  //   const data = await json

  //   console.log(data);

  //   if (response.status === 200) {
  //     setDefaultData(data)
  //   }
  // }

  // React.useEffect(() => {
  //   dataAPI()
  // }, [])

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const [header, setHeader] = React.useState();
  const handleClose = () => setOpen(false);

  const dispath = useDispatch()
  const tujuanPembelajaran = useSelector(tujuanPembelajaranSelector.selectAll)
  const refreshAPI = `${import.meta.env.VITE_API}/refresh-token`

  const refresh_token = async (api) => {
    const cookies = new Cookies()
    let token = cookies.get("token")
    const refresh = await fetch(api, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (refresh.status === 200) {
      const data = await refresh.json()

      cookies.remove("token", {
        path: "/",
        expires: new Date(new Date().getTime() + 200 * 1000)
      });

      cookies.set("token", data.access_token, {
        path: "/",
        expires: new Date(new Date().getTime() + 200 * 1000)
      });
    }
  }

  React.useEffect(() => {
    dispath(getTujuanPembelajaran())
    // refresh_token()
  }, [dispath])

  // React.useEffect(() => {
  //   refresh_token(refreshAPI)
  // }, [dispath, tujuanPembelajaran])


  React.useEffect(() => {
    setDefaultData(tujuanPembelajaran != "Tidak ada data" ? tujuanPembelajaran : [])
  }, [tujuanPembelajaran])

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = defaultData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    const filtered = data.filter(item => {
      if (item.title.toLowerCase() != undefined && !item.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }

      return true;
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filtered;
  };

  const handleOpen = (id, header) => {
    setId(id)
    setHeader(header)
    setOpen(true)
  };

  const handleDelete = () => {
    setOpen(false)
    dispath(deleteTujuanPembelajaran(id))
    toast.success(`Data judul ${header} berhasil dihapus`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  // const [index, setIndex] = React.useState(0)

  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb>
              <Breadcrumb.Item>Tahun Ajaran</Breadcrumb.Item>
              <Breadcrumb.Item active>Daftar Tujuan Pembelajaran</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
      >
        <ToastContainer />
        <Stack className='flex justify-between mb-5' spacing={6}>
          <Button appearance="primary" className='bg-blue-400'
            onClick={() => navigate(`/admin/tambah-tujuan-pembelajaran`)}
          // href='tambah-kelas'
          >
            Tambah Tujuan Pembelajaran
          </Button>

          <InputGroup inside>
            <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
        <Table
          height={Math.max(getHeight(window) - 200, 400)}
          data={filteredData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          wordWrap="break-word">

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>Title</HeaderCell>
            {/* <Cell dataKey="name" /> */}
            <Cell>{rowData => `${rowData?.title}`}</Cell>
          </Column>

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>Body</HeaderCell>
            {/* <Cell dataKey="nisn" /> */}
            <Cell>{rowData => `${rowData?.body}`}</Cell>
          </Column>

          <Column width={100} align="center" fixed>
            <HeaderCell>Pengajuan</HeaderCell>
            {/* <Cell dataKey="tujuan_masuk" /> */}
            <Cell>{rowData => `${rowData?.pengajuan}`}</Cell>
          </Column>

          <Column width={100} align="center" fixed>
            <HeaderCell>Status</HeaderCell>
            {/* <Cell dataKey='tanggal_lahir' /> */}
            <Cell>{rowData => `${rowData?.status}`}</Cell>
          </Column>

          <Column width={100} align="center" fixed>
            <HeaderCell>Action</HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <div className='flex place-content-center gap-1'>
                  <Button className='hover:bg-green-500 group' onClick={() => navigate(`/admin/edit-tujuan-pembelajaran/${rowData.id}`)}>
                    <EditIcon className='group-hover:text-white' />
                  </Button>
                  <Button className='hover:bg-red-500 group' onClick={() => handleOpen(rowData.id, rowData.title)}>
                    <TrashIcon className='group-hover:text-white' />
                  </Button>
                </div>
              )}
            </Cell>
          </Column>

          {/* <Column width={100} sortable>
            <HeaderCell>Elemen</HeaderCell>
            <Cell dataKey="ml.nama_Lembaga" />
          </Column> */}

        </Table>
        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={defaultData.length}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
        <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
          <Modal.Body>
            <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
            Apakah kamu yakin untuk menghapus data dengan judul {header} ini?
          </Modal.Body>
          <Modal.Footer>
            <Button className='bg-red-500' onClick={handleDelete} color="red" appearance="primary">
              Hapus
            </Button>
            <Button className='bg-slate-100' onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    </>
  )
}

export default DaftarTujuanPembelajaran