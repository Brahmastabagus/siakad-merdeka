import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, Input, SelectPicker } from 'rsuite'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { setMapel, update } from '../../../store/mapelSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  nama_mapel: StringType().isRequired('Inputan harus diisi.'),
  deskripsi_mapel: StringType().isRequired('Inputan harus diisi.'),
  kode_mapel: StringType().isRequired('Inputan harus diisi.').containsNumber('Harus berisi angka'),
});
const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const TambahMapel = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [tingkat, setTingkat] = React.useState([])
  const [tingkatList, setTingkatList] = React.useState([])
  const tingkatApi = `${import.meta.env.VITE_API}/master/tingkat-pendidikan`
  const navigate = useNavigate()

  const tingkatAPI = async () => {
    const response = await fetch(tingkatApi)
    const json = await response.json()
    const data = await json
    const data_tingkat = []

    data.map((data) => {
      data_tingkat.push({
        id: data.id,
        label: data.tingkat_pendidikan,
        value: data.id
      })
    })

    if (response.status === 200) {
      setTingkat(data_tingkat)
    }
  }

  React.useEffect(() => {
    tingkatAPI()
  }, [])

  const updateData = () => {
    if (tingkatList.length === 0) {
      setTingkatList(tingkat);
    }
  };

  const menuTingkat = menu => {
    if (tingkatList.length === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <SpinnerIcon spin /> Loading...
        </p>
      );
    }
    return menu;
  };

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    // console.log(formValue, 'Form Value');
    if (formRef.current.check()) {
      const res = await dispatch(setMapel(formValue))

      if (res.meta.requestStatus === "fulfilled") {
        // setTimeout(() => {
        toast.success("Data berhasil ditambahkan", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // }, 100);
        navigate("/admin/daftar-mapel")
      }
    }
  };
  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>Instrumen 1</Breadcrumb.Item>
              <Breadcrumb.Item href='/admin/daftar-mapel'>Daftar Mapel</Breadcrumb.Item>
              <Breadcrumb.Item aria-current="page" active>Tambah Mapel</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
        shaded
      >
        <Form
          ref={formRef}
          onChange={setFormValue}
          model={model}
          fluid
        >
          
          <Form.Group controlId="nama_mapel">
            <Form.ControlLabel>Nama Mapel</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="nama_mapel"
              errorPlacement='bottomEnd'
              placeholder="Matematika "
            />
            <Form.HelpText>Nama Mapel harus diisi</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="kode_mapel">
            <Form.ControlLabel>Kode Mapel</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="kode_mapel"
              errorPlacement='bottomEnd'
              placeholder="MTK0123 "
            />
            <Form.HelpText>Kode Mapel harus diisi</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="deskripsi_mapel">
            <Form.ControlLabel>Deskripsi Mapel</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              accepter={Textarea}
              name="deskripsi_mapel"
              errorPlacement='bottomEnd'
              placeholder="Matematika adalah salah satu mapel... "
              rows={5}
              required
            />
            <Form.HelpText>Deskripsi Mapel harus diisi</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="tingkat">
            <Form.ControlLabel>Pilih Tingkatan</Form.ControlLabel>
            <Form.Control
              className='!w-full'
              accepter={SelectPicker}
              data={tingkatList}
              onOpen={updateData}
              onSearch={updateData}
              renderMenu={menuTingkat}
              name='tingkatan_id'
            />
            <Form.HelpText>Pilih tingkatan harus dipilih</Form.HelpText>
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

export default TambahMapel