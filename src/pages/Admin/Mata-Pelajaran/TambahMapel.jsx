import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, Input, SelectPicker } from 'rsuite'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { setMapel, update } from '../../../store/mapelSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Inputan harus diisi.'),
  kode: StringType().isRequired('Inputan harus diisi.').containsNumber('Harus berisi angka'),
});
const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const TambahMapel = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [tahunAjaran, setTahunAjaran] = React.useState([])
  const [tahunAjaranList, setTahunAjaranList] = React.useState([])
  const [user, setUser] = React.useState([])
  const [userList, setUserList] = React.useState([])
  const tahunAjaranApi = `${import.meta.env.VITE_API}/tahun-ajaran`
  const userApi = `${import.meta.env.VITE_API}/user`
  const navigate = useNavigate()

  const tahunAjaranAPI = async () => {
    const cookies = new Cookies()
    let token = cookies.get("token")
    const response = await fetch(tahunAjaranApi, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const json = await response.json()
    const data = await json
    const data_tahunAjaran = []

    data.map((data) => {
      if (data.mapel.length === 0) {
        console.log(data.kode);
        data_tahunAjaran.push({
          id: data.id,
          label: data.kode,
          value: data.id
        })
      }
    })

    if (response.status === 200) {
      setTahunAjaran(data_tahunAjaran)
    }
  }

  const userAPI = async () => {
    const cookies = new Cookies()
    let token = cookies.get("token")
    const response = await fetch(userApi, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const json = await response.json()
    const data = await json
    const data_user = []

    data.map((data) => {
      if (data.mapel.length === 0) {
        data_user.push({
          id: data.id,
          label: data.name,
          value: data.id
        })
      }
    })

    if (response.status === 200) {
      setUser(data_user)
    }
  }

  React.useEffect(() => {
    tahunAjaranAPI()
    userAPI()
  }, [])

  const updateData = () => {
    if (tahunAjaranList.length === 0 && userList.length === 0) {
      setTahunAjaranList(tahunAjaran);
      setUserList(user);
    }
  };

  const menuList = menu => {
    if (tahunAjaranList.length === 0 && userList.length === 0) {
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
    console.log(formValue, 'Form Value');
    if (formRef.current.check()) {
      const res = await dispatch(setMapel(formValue))
      console.log(res);

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
              <Breadcrumb.Item>Tahun Ajaran</Breadcrumb.Item>
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
          // model={model}
          fluid
        >

          <Form.Group controlId="kode_mapel">
            <Form.ControlLabel>Kode Mapel</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="kode"
              errorPlacement='bottomEnd'
              placeholder="MTK0123 "
            />
            <Form.HelpText>Kode Mapel harus diisi</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="nama_mapel">
            <Form.ControlLabel>Nama Mapel</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="name"
              errorPlacement='bottomEnd'
              placeholder="Matematika "
            />
            <Form.HelpText>Nama Mapel harus diisi</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="tahun_ajaran_id">
            <Form.ControlLabel>Pilih Tahun Ajaran</Form.ControlLabel>
            <Form.Control
              className='!w-full'
              accepter={SelectPicker}
              data={tahunAjaranList}
              onOpen={updateData}
              onSearch={updateData}
              renderMenu={menuList}
              name='tahun_ajaran_id'
            />
            <Form.HelpText>Pilih Tahun Ajaran harus dipilih</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="user_id">
            <Form.ControlLabel>Pilih User</Form.ControlLabel>
            <Form.Control
              className='!w-full'
              accepter={SelectPicker}
              data={userList}
              onOpen={updateData}
              onSearch={updateData}
              renderMenu={menuList}
              name='user_id'
            />
            <Form.HelpText>Pilih User harus dipilih</Form.HelpText>
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