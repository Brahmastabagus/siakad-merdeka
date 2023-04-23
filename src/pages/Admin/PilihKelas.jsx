import React from 'react'
import { Table, Pagination, Stack, InputGroup, Input, DOMHelper, Panel, Breadcrumb, Button, SelectPicker, InputPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getKelas, kelasSelector } from '../../store/kelasSlice';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const PilihKelas = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [defaultData, setDefaultData] = React.useState([]);
  const [tahunAjaran, setTahunAjaran] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const navigate = useNavigate();
  const tahunApi = `${import.meta.env.VITE_API}/master/tahun-ajaran`
  const [activeTahun, setActiveTahun] = React.useState();
  
  const tahunAPI = async () => {
    const response = await fetch(tahunApi)
    const json = await response.json()
    const datas = await json
    const data_tahun = []

    datas.forEach((data) => {
      data_tahun.push({
        id: data.id,
        label: `${data.kode_tahun_ajaran} - ${data.semester.toUpperCase()}`,
        value: data.id
      })
    })

    if (new Date().getMonth() < 8) {
      let tahun = {
          data: datas.find((data) => {
          // console.log(data);
          return data.kode_tahun_ajaran === `${new Date().getFullYear() - 1}/${new Date().getFullYear()}`
        })
      }

      if (tahun.data != undefined) {
        setActiveTahun(tahun.data.id)
      }
    } else {
      let tahuns = {
        data: datas.find((data) => {
          return data.kode_tahun_ajaran === `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`
        })
      }
      if (tahuns.data != undefined) {
        setActiveTahun(tahuns.data.id)
      }
    }
    
    if (response.status === 200) {
      setTahunAjaran(data_tahun)
    }
  }
  
  React.useEffect(() => {
    tahunAPI()
  }, [])
  
  const dispath = useDispatch()
  const kelas = useSelector(kelasSelector.selectAll)
  React.useEffect(() => {
    dispath(getKelas())
  }, [dispath])
  
  React.useEffect(() => {
    setDefaultData(kelas)
    filter()
  }, [kelas])


  // React.useEffect(() => {
  //   if (new Date().getMonth() < 8) {
  //     let tahun = {
  //       data: dataTahun.find((data) => {
  //         // console.log(data);
  //         return data.kode_tahun_ajaran === `${new Date().getFullYear() - 1}/${new Date().getFullYear()}`
  //       })
  //     }

  //     if (tahun.data != undefined) {
  //       // console.log(tahun.data);
  //       setActiveTahun(tahun.data.id)
  //     }
  //   } else {
  //     let tahuns = {
  //       data: dataTahun.find((data) => {
  //         return data.kode_tahun_ajaran === `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`
  //       })
  //     }

  //     // console.log(tahuns.data);
  //     if (tahuns.data != undefined) {
  //       setActiveTahun(tahuns.data.id)

  //     }
  //   }
  // }, [dataTahun, setActiveTahun])

  // React.useEffect(() => {
  //   if (new Date().getMonth() < 2) {
  //     let d = {}
  //     tahunAjaran.forEach((data) => {
  //       if (data.label === `${new Date().getFullYear() - 1}/${new Date().getFullYear()} - GANJIL`) {
  //         // console.log(data.id);
  //         d = data.id
  //       }
  //       //  console.log(d);
  //     })
  //     setActiveTahun(d)
  //     // console.log(activeTahun);
  //   } else {
  //     let e = 2
  //     tahunAjaran.forEach((data) => {
  //       if (data.label === `${new Date().getFullYear()}/${new Date().getFullYear() + 1} - GENAP`) {
  //         if (data.id != {}) {
  //           e = data.id
  //         }
  //       }
  //       // console.log(e);
  //       setActiveTahun(1)
  //     })
  //   }
  // }, [tahunAjaran])

  const handleChange = (e) => {
    let t = []
    if (e != null && defaultData != []) {
      setDefaultData(defaultData.filter((data) => {
        // console.log("sda" + data.id, e);
        return data.id === e
      }))
      console.log(defaultData);
    } else {
      setDefaultData(kelas)
    }
    console.log(t);
    // setDefaultData(t)
  }


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
      if (!item.kode_kelas.toLowerCase().includes(searchKeyword.toLowerCase())) {
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

  const filter = () => {
    if (activeTahun != undefined) {
      setDefaultData(kelas.filter((data) => {
        return data.id === activeTahun
      }))
      
    }
  }

  // const handleClean = () => {
  //   setActiveTahun(undefined)
  // }

  // let date = new Date().getMonth()
  // function s () {
  //   if (date < 8) {
  //     let findTahun = []
  //     findTahun.push(tahunAjaran.find((data) => {
  //       return data.label === `${new Date().getFullYear() - 1}/${new Date().getFullYear()} - GANJIL`
  //     }))
  //     // console.log(findTahun ?? 1);
  //     // return findTahun.value
  //     console.log(findTahun);
  //   } else {
  //     // let findTahuns = tahunAjaran.find((data) => {
  //     //   return data.label === `${new Date().getFullYear()}/${new Date().getFullYear() + 1} - GENAP`))
  //     //   // console.log();
  //     // })
  //     // tahun = findTahuns.value
  //   }
  // }
  // // const [tahun, setTahun] = React.useState(s())
  // console.log(s());

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
        <Stack className='flex justify-between mb-5' spacing={6}>
          <Button appearance="primary" className='bg-blue-400'
            onClick={() => navigate(`/admin/tambah-kelas`)}
          // href='tambah-kelas'
          >
            Tambah Kelas
          </Button>

          <SelectPicker
            value={activeTahun}
            data={tahunAjaran}
            style={{ width: 224 }}
            onChange={handleChange}
            onSelect={(e) => setActiveTahun(e) }
            // onClean={handleClean}
             />
          <h1>{activeTahun}</h1>

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

          {/* <Column width={50} align="center" fixed>
            <HeaderCell>id</HeaderCell>
            <Cell dataKey="id" />
          </Column> */}

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Kode kelas</HeaderCell>
            <Cell dataKey="kode_kelas" />
          </Column>

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Nama Lembaga</HeaderCell>
            <Cell>
              {rowData =>
                `${rowData?.ml?.nama_lembaga}`
              }
            </Cell>
          </Column>

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Kode Tahun Ajaran</HeaderCell>
            <Cell>
              {rowData => `${rowData?.mta?.kode_tahun_ajaran}`}
            </Cell>
          </Column>

          <Column flexGrow={1} align="center" fixed>
            <HeaderCell>Semester</HeaderCell>
            <Cell>
              {rowData => `${rowData?.mta?.semester}`}
            </Cell>
          </Column>

          <Column width={110} align="center" fixed>
            <HeaderCell>Detail</HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <>
                  <Button appearance="link" onClick={() => navigate(`${rowData.id}`)}>
                    Detail Siswa
                  </Button>
                </>
              )}
            </Cell>
          </Column>

          <Column width={110} align="center" fixed>
            <HeaderCell>Pilih</HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <>
                  <Button appearance="link" onClick={() => navigate(`${rowData.id}`)}>
                    Pilih Siswa
                  </Button>
                </>
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
      </Panel>
    </>
  )
}

export default PilihKelas