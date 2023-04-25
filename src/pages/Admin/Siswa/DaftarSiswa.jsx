import React from 'react'
import { Table, Pagination, Stack, InputGroup, Input, DOMHelper, Panel, Breadcrumb, Button, IconButton, Modal } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSiswa, getSiswa, siswaSelector } from '../../../store/siswaSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemindIcon from '@rsuite/icons/legacy/Remind';

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

  React.useEffect(() => {
    dispath(getSiswa())
  }, [dispath])


  React.useEffect(() => {
    setDefaultData(siswa)
  }, [siswa])


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
      if (item.nis != undefined && !item.nis.includes(searchKeyword)) {
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
              <Breadcrumb.Item>Instrumen 1</Breadcrumb.Item>
              <Breadcrumb.Item active>Tabel</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
      >
        <ToastContainer />
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

          <Column width={100} align="center" fixed>
            <HeaderCell>nis</HeaderCell>
            <Cell dataKey="nis" />
          </Column>

          <Column width={100} align="center" fixed>
            <HeaderCell>nisn</HeaderCell>
            <Cell dataKey="nisn" />
          </Column>

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>Nama Lengkap</HeaderCell>
            <Cell dataKey="nama_lengkap" />
          </Column>

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey='email' />
          </Column>

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>No Telp</HeaderCell>
            <Cell dataKey='no_telp' />
          </Column>

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>Alamat</HeaderCell>
            <Cell dataKey='alamat' />
          </Column>

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey='status_kelulusan' />
          </Column>

          <Column width={100} align="center" fixed>
            <HeaderCell>Action</HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <div className='flex place-content-center gap-1'>
                  <Button className='hover:bg-green-500 group' onClick={() => navigate(`/admin/edit-siswa/${rowData.id}`)}>
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

export default DaftarSiswa