import React from 'react'
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, InputPicker, InputNumber, DatePicker, SelectPicker } from 'rsuite'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  elemen: StringType().isRequired('Inputan harus diisi.'),
  tujuan: StringType().isRequired('Inputan harus diisi.'),
  lingkup: StringType().isRequired('Inputan harus diisi.'),
  kelas: StringType().isRequired('Inputan harus diisi.'),
  jp: NumberType('Age should be a number').isRequired('Inputan harus diisi.'),
});

const TambahKelas = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [lembaga, setLembaga] = React.useState([])
  const [tahunAjaran, setTahunAjaran] = React.useState([])
  const [lembagaList, setLembagaList] = React.useState([])
  const [tahunList, setTahunList] = React.useState([])
  const lembagaApi = `${import.meta.env.VITE_API}/master/lembaga`
  const tahunApi = `${import.meta.env.VITE_API}/master/tahun-ajaran`

  const lembagaAPI = async () => {
    const response = await fetch(lembagaApi)
    const json = await response.json()
    const data = await json
    const data_lembaga = []

    data.map((data) => {
      data_lembaga.push({
        id: data.id,
        label: data.nama_lembaga,
        value: data.id
      })
    })

    if (response.status === 200) {
      setLembaga(data_lembaga)
    }
  }

  const tahunAPI = async () => {
    const response = await fetch(tahunApi)
    const json = await response.json()
    const data = await json
    const data_tahun = []

    data.map((data) => {
      data_tahun.push({
        id: data.id,
        label: data.kode_tahun_ajaran,
        value: data.id
      })
    })

    if (response.status === 200) {
      setTahunAjaran(data_tahun)
    }
  }

  React.useEffect(() => {
    lembagaAPI()
    tahunAPI()
  }, [])

  const updateData = () => {
    if (lembagaList.length === 0 && tahunList.length === 0) {
      setLembagaList(lembaga);
      setTahunList(tahunAjaran);
    }
  };

  const menuLembaga = menu => {
    if (lembagaList.length === 0 && tahunList === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <SpinnerIcon spin /> Loading...
        </p>
      );
    }
    return menu;
  };

  const handleSubmit = () => {
    console.log(formValue, 'Form Value');
  };
  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>Instrumen 1</Breadcrumb.Item>
              <Breadcrumb.Item href='/admin/daftar-siswa'>Daftar Siswa</Breadcrumb.Item>
              <Breadcrumb.Item aria-current="page" active>Tambah Siswa</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
        shaded
      >
        <Form onChange={setFormValue} ref={formRef} fluid>
          <Form.Group controlId="kode_kelas">
            <Form.ControlLabel>Kode Kelas</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="kode_kelas"
              errorPlacement='bottomEnd'
              accepter={InputNumber}
              placeholder="31231... "
            />
            <Form.HelpText>Kode Kelas harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="lembaga">
            <Form.ControlLabel>Pilih Lembaga</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              accepter={SelectPicker}
              data={lembagaList}
              style={{ width: 224 }}
              onOpen={updateData}
              onSearch={updateData}
              renderMenu={menuLembaga}
              name='lembaga'
            />
            <Form.HelpText>Pilih Lembaga harus dipilih</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="tahun">
            <Form.ControlLabel>Pilih Tahun Ajaran</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              accepter={SelectPicker}
              data={tahunList}
              style={{ width: 224 }}
              onOpen={updateData}
              onSearch={updateData}
              renderMenu={menuLembaga}
              name='tahun'
            />
            <Form.HelpText>Pilih tahun ajaran harus dipilih</Form.HelpText>
          </Form.Group>
          <ButtonToolbar>
            <Button className='bg-sky-500' appearance="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form>
      </Panel>
    </>
  )

}

export default TambahKelas