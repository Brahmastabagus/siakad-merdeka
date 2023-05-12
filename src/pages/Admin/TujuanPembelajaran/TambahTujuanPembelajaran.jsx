import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, InputPicker, InputNumber, DatePicker, InputGroup, Input, toaster, SelectPicker } from 'rsuite'
import { setSiswa } from '../../../store/siswaSlice';
import { ToastContainer, toast } from 'react-toastify';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

const { StringType } = Schema.Types;
const model = Schema.Model({
  title: StringType().isRequired('Inputan harus diisi.'),
  body: StringType().isRequired('Inputan harus diisi.'),
});
const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const pengajuan = ['True', 'False'].map(
  item => ({ label: item, value: item })
);

const status = ['Approve', 'Pending', 'Rejected'].map(
  item => ({ label: item, value: item })
);

const TambahTujuanPembelajaran = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [mapel, setMapel] = React.useState([])
  const [mapelList, setMapelList] = React.useState([])
  const [user, setUser] = React.useState([])
  const [userList, setUserList] = React.useState([])
  const mapelApi = `${import.meta.env.VITE_API}/mapel`
  const userApi = `${import.meta.env.VITE_API}/user`
  const navigate = useNavigate()

  const mapelAPI = async () => {
    const cookies = new Cookies()
    let token = cookies.get("token")
    const response = await fetch(mapelApi, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const json = await response.json()
    const data = await json
    const data_mapel = []

    data.map((data) => {
      if (data.tujuan_pembelajaran.length === 0) {
        // console.log(data.kode);
        data_mapel.push({
          id: data.id,
          label: data.kode,
          value: data.id
        })
      }
    })

    if (response.status === 200) {
      setMapel(data_mapel)
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
    mapelAPI()
    userAPI()
  }, [])

  const updateData = () => {
    if (mapelList.length === 0 && userList.length === 0) {
      setMapelList(mapel);
      setUserList(user);
    }
  };

  const menuList = menu => {
    if (mapelList.length === 0 && userList.length === 0) {
      return (
        <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
          <SpinnerIcon spin /> Loading...
        </p>
      );
    }
    return menu;
  };

  const dispatch = useDispatch()

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    // console.log();
    console.log(formValue, 'Form Value');
    // if (formRef.current.check()) {
    //   // const res = await dispatch(setSiswa(formValue))

    //   // if (res.meta.requestStatus === "fulfilled") {
    //   //   // setTimeout(() => {
    //   //   toast.success("Data berhasil ditambahkan", {
    //   //     position: "top-center",
    //   //     autoClose: 1500,
    //   //     hideProgressBar: false,
    //   //     closeOnClick: true,
    //   //     pauseOnHover: true,
    //   //     draggable: true,
    //   //     progress: undefined,
    //   //     theme: "dark",
    //   //   });
    //   //   // }, 100);
    //   //   navigate("/admin/daftar-siswa")
    //   // }
    // }
  };
  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb>
              <Breadcrumb.Item>Tahun Ajaran</Breadcrumb.Item>
              <Breadcrumb.Item href='/admin/tambah-tujuan-pembelajaran'>Daftar Tujuan Pembelajaran</Breadcrumb.Item>
              <Breadcrumb.Item aria-current="page" active>Tambah Tujuan Pembelajaran</Breadcrumb.Item>
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
          <Form.Group controlId="title">
            <Form.ControlLabel>Title</Form.ControlLabel>
            <Form.Control
              // classNisn='!w-[700px]'
              name="title"
              errorPlacement='bottomEnd'
              placeholder="Title"
            />
            <Form.HelpText>Title harus diisi</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="body">
            <Form.ControlLabel>Body</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              accepter={Textarea}
              name="body"
              errorPlacement='bottomEnd'
            />
            <Form.HelpText>Body harus diisi</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="user_id">
            <Form.ControlLabel>Pilih User</Form.ControlLabel>
            <Form.Control
              className='!w-full'
              accepter={SelectPicker}
              data={mapelList}
              onOpen={updateData}
              onSearch={updateData}
              renderMenu={menuList}
              name='user_id'
            />
            <Form.HelpText>Pilih User harus dipilih</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="mapel_id">
            <Form.ControlLabel>Pilih Mata Pelajaran</Form.ControlLabel>
            <Form.Control
              className='!w-full'
              accepter={SelectPicker}
              data={mapelList}
              onOpen={updateData}
              onSearch={updateData}
              renderMenu={menuList}
              name='mapel_id'
            />
            <Form.HelpText>Pilih Mata Pelajaran harus dipilih</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="pengajuan">
            <Form.ControlLabel>Pilih Pengajuan</Form.ControlLabel>
            <Form.Control
              className='!w-full'
              accepter={SelectPicker}
              data={pengajuan}
              name='pengajuan'
            />
            <Form.HelpText>Pilih Pengajuan harus dipilih</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="status">
            <Form.ControlLabel>Pilih Status</Form.ControlLabel>
            <Form.Control
              className='!w-full'
              accepter={SelectPicker}
              data={status}
              name='status'
            />
            <Form.HelpText>Pilih Status harus dipilih</Form.HelpText>
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

export default TambahTujuanPembelajaran