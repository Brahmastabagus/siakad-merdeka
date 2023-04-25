import React from 'react'
import { Table, Pagination, Stack, InputGroup, Input, DOMHelper, Panel, Breadcrumb, Button, IconButton, Modal } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMapel, getMapel, mapelSelector } from '../../../store/mapelSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemindIcon from '@rsuite/icons/legacy/Remind';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const DaftarMapel = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [defaultData, setDefaultData] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const handleOpen = (id) => {
    setId(id)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const dispath = useDispatch()
  const mapel = useSelector(mapelSelector.selectAll)

  React.useEffect(() => {
    dispath(getMapel())
  }, [dispath])


  React.useEffect(() => {
    setDefaultData(mapel)
  }, [mapel])

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
      if (item.nama_mapel.toLowerCase() != undefined && !item.nama_mapel.toLowerCase().includes(searchKeyword.toLowerCase())) {
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
    dispath(deleteMapel(id))
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
            onClick={() => navigate(`/admin/tambah-mapel`)}
          // href='tambah-kelas'
          >
            Tambah Mapel
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

          <Column width={150} align="center" fixed>
            <HeaderCell>Nama Mapel</HeaderCell>
            <Cell dataKey="nama_mapel" />
          </Column>

          <Column width={150} align="center" fixed>
            <HeaderCell>Kode Mapel</HeaderCell>
            <Cell dataKey="kode_mapel" />
          </Column>

          <Column flexGrow={1} align="center" fullText fixed>
            <HeaderCell>Deskripsi Mapel</HeaderCell>
            <Cell dataKey="deskripsi_mapel" />
          </Column>

          <Column width={150} align="center">
            <HeaderCell>Tingkat Pendidikan</HeaderCell>
            <Cell>{rowData => `${rowData?.mtp?.tingkat_pendidikan}`}</Cell>
          </Column>

          <Column width={150} align="center">
            <HeaderCell>Jurusan</HeaderCell>
            <Cell>{rowData => `${rowData?.mtp?.jurusan}`}</Cell>
          </Column>

          <Column width={100} align="center" fixed>
            <HeaderCell>Action</HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <div className='flex place-content-center gap-1'>
                  <Button className='hover:bg-green-500 group' onClick={() => navigate(`/admin/edit-mapel/${rowData.id}`)}>
                    <EditIcon className='group-hover:text-white' />
                  </Button>
                  <Button className='hover:bg-red-500 group' onClick={() => handleOpen(rowData.id)}>
                    <TrashIcon className='group-hover:text-white' />
                  </Button>
                </div>
              )}
            </Cell>
          </Column>

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

export default DaftarMapel