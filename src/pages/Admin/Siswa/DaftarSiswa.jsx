import React from 'react'
import { Table, Pagination, Stack, InputGroup, Input, DOMHelper, Panel, Breadcrumb, Button, IconButton, Modal } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSiswa, getSiswa, siswaSelector } from '../../../store/plotSiswaSlice';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import Cookies from 'universal-cookie';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DaftarSiswa = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [defaultData, setDefaultData] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const navigate = useNavigate();
  // const kelasAPI = `${import.meta.env.VITE_API}/master/siswa`

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
  const handleOpen = (id) => {
    setId(id)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const dispath = useDispatch()
  const siswa = useSelector(siswaSelector.selectAll)
  const refreshAPI = `${import.meta.env.VITE_API}/refresh-token`

  const cookies = new Cookies()
  const refresh_token = async (api, token) => {
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
    dispath(getSiswa())
    // refresh_token()
  }, [dispath])
  
  React.useEffect(() => {
    let token = cookies.get("token")
    refresh_token(refreshAPI, token)
  }, [dispath])


  React.useEffect(() => {
    setDefaultData(siswa != "Tidak ada data" ? siswa : [])
    // console.log(defaultData);
  }, [siswa])

  // console.log(defaultData == );


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
      if (item?.siswa?.name.toLowerCase() != undefined && !item?.siswa?.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
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

  const handleDelete = () => {
    setOpen(false)
    dispath(deleteSiswa(id))
    toast.success(`Data id ${id} berhasil dihapus`, {
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

  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb>
              <Breadcrumb.Item>Daftar Dapodik</Breadcrumb.Item>
              <Breadcrumb.Item active>Daftar Siswa</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
      >
        <Stack className='flex justify-between mb-5' spacing={6}>
          <Button appearance="primary" className='bg-blue-400'
            onClick={() => navigate(`/admin/tambah-siswa`)}
          // href='tambah-kelas'
          >
            Tambah Siswa
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
            <HeaderCell>Nama</HeaderCell>
            {/* <Cell dataKey="name" /> */}
            <Cell>{rowData => `${rowData?.siswa?.name}`}</Cell>
          </Column>

          <Column width={100} align="center" fixed>
            <HeaderCell>nisn</HeaderCell>
            {/* <Cell dataKey="nisn" /> */}
            <Cell>{rowData => `${rowData?.siswa?.nisn ? rowData?.siswa?.nisn : "Tidak ada"}`}</Cell>
          </Column>

          <Column width={130} align="center" fixed>
            <HeaderCell>Tahun Masuk</HeaderCell>
            {/* <Cell dataKey="tahun_masuk" /> */}
            <Cell>{rowData => `${rowData?.siswa?.tahun_masuk}`}</Cell>
          </Column>

          <Column width={130} align="center" fixed>
            <HeaderCell>Tanggal Lahir</HeaderCell>
            {/* <Cell dataKey='tanggal_lahir' /> */}
            <Cell>{rowData => `${rowData?.siswa?.tanggal_lahir}`}</Cell>
          </Column>

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>Kelas</HeaderCell>
            {/* <Cell dataKey='tanggal_lahir' /> */}
            <Cell>{rowData => `${rowData?.kelas?.name}`}</Cell>
          </Column>
          <Column width={130} align="center" fixed>
            <HeaderCell>Mata Pelajaran</HeaderCell>
            {/* <Cell dataKey='tanggal_lahir' /> */}
            <Cell>{rowData => `${rowData?.mapel?.name}`}</Cell>
          </Column>

          <Column width={100} align="center" fixed>
            <HeaderCell>Action</HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <div className='flex place-content-center gap-1'>
                  <Button className='hover:bg-green-500 group' onClick={() => navigate(`/admin/edit-siswa/${rowData.siswa.id}`)}>
                    <EditIcon className='group-hover:text-white' />
                  </Button>
                  <Button className='hover:bg-red-500 group' onClick={() => handleOpen(rowData.siswa.id)}>
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
            Apakah kamu yakin untuk menghapus data dengan id {id} ini?
          </Modal.Body>
          <Modal.Footer>
            <Button className='bg-sky-500' onClick={handleDelete} appearance="primary">
              Ok
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

export default DaftarSiswa