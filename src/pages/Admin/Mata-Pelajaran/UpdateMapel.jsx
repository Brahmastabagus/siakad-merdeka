import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, Input, SelectPicker } from 'rsuite'
import { getMapel, mapelSelector, updateMapel } from '../../../store/mapelSlice';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  nama_mapel: StringType().isRequired('Inputan harus diisi.'),
  deskripsi_mapel: StringType().isRequired('Inputan harus diisi.'),
  kode_mapel: StringType().isRequired('Inputan harus diisi.').containsNumber('Harus berisi angka'),
});

const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const UpdateMapel = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [defaultData, setDefaultData] = React.useState({});
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
      // console.log(defaultData?.tahun_ajaran_id);
      // if (data.id === defaultData?.tahun_ajaran_id) {
      //   console.log(data.id, data.kode);
      //   data_tahunAjaran.push({
      //     id: data.id,
      //     label: data.kode,
      //     value: data.id
      //   })
      //   console.log(data_tahunAjaran);
      // }
      // if (data.mapel.length === 0) {
        // console.log(data.kode);
        data_tahunAjaran.push({
          id: data.id,
          label: data.kode,
          value: data.id
        })
      // }
      // console.log(data_tahunAjaran);
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
      // if (data.mapel.length === 0) {
        data_user.push({
          id: data.id,
          label: data.name,
          value: data.id
        })
      // }
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

  const { idMapel } = useParams()
  const dispatch = useDispatch()

  const dispath = useDispatch()
  const mapel = useSelector((state) => mapelSelector.selectById(state, idMapel))

  React.useEffect(() => {
    dispath(getMapel())
  }, [dispath])


  React.useEffect(() => {
    if (mapel != undefined) {
      setDefaultData(mapel)

      if (tahunAjaranList.length === 0 && userList.length === 0) {
        setTahunAjaranList(tahunAjaran);
        setUserList(user);
      }
      // console.log(defaultData);
    }
  }, [mapel])

  const handleSubmit = async () => {
    console.log(formValue, 'Form Value');
    // console.log();
    // if (formRef.current.check() && formValue != {}) {
      const res = await dispatch(updateMapel(formValue))

      if (res.meta.requestStatus === "fulfilled") {
        // setTimeout(() => {
        toast.success("Data berhasil diubah", {
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
    // }
  };
  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>Tahun Ajaran</Breadcrumb.Item>
              <Breadcrumb.Item href='/admin/daftar-mapel'>Daftar Mapel</Breadcrumb.Item>
              <Breadcrumb.Item aria-current="page" active>Update Mapel</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
        shaded
      >
        <Form
          ref={formRef}
          onChange={setFormValue}
          formValue={defaultData}
          model={model}
          fluid
        >
          <Form.Group controlId="kode_mapel">
            <Form.ControlLabel>Kode Mapel</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="kode"
              errorPlacement='bottomEnd'
              placeholder="MTK0123 "
              value={defaultData?.kode}
              onChange={(data) => setDefaultData({ ...defaultData, kode: data })}
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
              value={defaultData?.name}
              onChange={(data) => setDefaultData({ ...defaultData, name: data })}
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
              value={defaultData?.tahun_ajaran_id}
              onChange={(data) => setDefaultData({ ...defaultData, tahun_ajaran_id: data })}
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
              value={defaultData?.user_id}
              onChange={(data) => setDefaultData({ ...defaultData, user_id: data })}
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

export default UpdateMapel