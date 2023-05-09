import React from 'react'
import { Table, Pagination, Stack, InputGroup, Input, DOMHelper, Panel, Breadcrumb, Button, IconButton, Modal } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTahunAjaran, getTahunAjaran, tahunAjaranSelector } from '../../../store/tahunAjaranSlice';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import Cookies from 'universal-cookie';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DaftarTahunAjaran = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [defaultData, setDefaultData] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const navigate = useNavigate();
  // const kelasAPI = `${import.meta.env.VITE_API}/master/tahunAjaran`

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
  const tahunAjaran = useSelector(tahunAjaranSelector.selectAll)
  const index = useSelector(tahunAjaranSelector.selectIds)
  let indexs = Object.keys(index)
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
    dispath(getTahunAjaran())
    // refresh_token()
  }, [dispath])

  // React.useEffect(() => {
  //   refresh_token(refreshAPI)
  // }, [dispath, tahunAjaran])


  React.useEffect(() => {
    setDefaultData(tahunAjaran != "Tidak ada data" ? tahunAjaran : [])
  }, [tahunAjaran])

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
      if (item.kode.toLowerCase() != undefined && !item.kode.toLowerCase().includes(searchKeyword.toLowerCase())) {
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
    dispath(deleteTahunAjaran(id))
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

  // const [index, setIndex] = React.useState(0)

  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb>
              <Breadcrumb.Item>Tahun Ajaran</Breadcrumb.Item>
              <Breadcrumb.Item active>Daftar Tahun Ajaran</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
      >
        <Stack className='flex justify-between mb-5' spacing={6}>
          <Button appearance="primary" className='bg-blue-400'
            onClick={() => navigate(`/admin/tambah-tahun-ajaran`)}
          // href='tambah-kelas'
          >
            Tambah Tahun Ajaran
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
            <HeaderCell>Kode</HeaderCell>
            {/* <Cell dataKey="name" /> */}
            <Cell>{`${Object.keys(index)}`}</Cell>
          </Column>

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>Kode</HeaderCell>
            {/* <Cell dataKey="name" /> */}
            <Cell>{rowData => `${rowData?.kode}`}</Cell>
          </Column>

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Semester</HeaderCell>
            {/* <Cell dataKey="nisn" /> */}
            <Cell>{rowData => `${rowData?.semester}`}</Cell>
          </Column>

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Tanggal Mulai</HeaderCell>
            {/* <Cell dataKey="tahun_masuk" /> */}
            <Cell>{rowData => `${rowData?.tgl_mulai}`}</Cell>
          </Column>

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Tanggal Selesai</HeaderCell>
            {/* <Cell dataKey='tanggal_lahir' /> */}
            <Cell>{rowData => `${rowData?.tgl_selesai}`}</Cell>
          </Column>

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Action</HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <div className='flex place-content-center gap-1'>
                  <Button className='hover:bg-green-500 group' onClick={() => navigate(`/admin/edit-tahun-ajaran/${rowData.id}`)}>
                    <EditIcon className='group-hover:text-white' />
                  </Button>
                  <Button className='hover:bg-red-500 group' onClick={() => handleOpen(rowData.id)}>
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

export default DaftarTahunAjaran