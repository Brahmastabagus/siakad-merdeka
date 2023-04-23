import React from 'react'
import { Table, Pagination, Stack, InputGroup, Input, DOMHelper, Panel, Breadcrumb } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

const TabelPembelajaran = () => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [defaultData, setDefaultData] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();

  const dataAPI = async () => {
    const response = await fetch('http://localhost:3000/tujuan')
    const json = await response.json()
    const data = await json

    if (response.status === 200) {
      setDefaultData(data)
    }
  }

  React.useEffect(() => {
    dataAPI()
  }, [])

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
      if (!item.elemen.toLowerCase().includes(searchKeyword.toLowerCase())) {
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
        <Stack className='flex justify-end' spacing={6}>
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
          <Column width={50} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={100} sortable>
            <HeaderCell>Elemen</HeaderCell>
            <Cell dataKey="elemen" />
          </Column>

          <Column width={100} flexGrow={1} >
            <HeaderCell>Tujuan Pembelajaran</HeaderCell>
            <Cell dataKey="tujuan" />
          </Column>

          <Column width={200}>
            <HeaderCell>Ruang Lingkup Materi</HeaderCell>
            <Cell dataKey="lingkup" />
          </Column>

          <Column width={100} sortable>
            <HeaderCell>Kelas/Semester</HeaderCell>
            <Cell dataKey="kelas" />
          </Column>

          <Column width={50}>
            <HeaderCell>JP</HeaderCell>
            <Cell dataKey="jp" />
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

export default TabelPembelajaran