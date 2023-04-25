import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, InputGroup, Input } from 'rsuite'
import { getSiswa, siswaSelector, updateSiswa } from '../../../store/siswaSlice';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  nisn: NumberType("NISN harus angka").isRequired('Inputan harus diisi.'),
  nis: NumberType("NIS harus angka").isRequired('Inputan harus diisi.'),
  nama_lengkap: StringType().isRequired('Inputan harus diisi.'),
  alamat: StringType().isRequired('Inputan harus diisi.'),
  no_telp: NumberType('No telp harus angka').pattern(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, 'No telp harus sesuai dengan no telp pada umumnya').isRequired('Inputan harus diisi.'),
  email: StringType().isEmail('Email required'),
  password: StringType().isRequired('Inputan harus diisi.'),
  tahun_masuk: NumberType('Tahun masuk harus angka').pattern(/(?:(?:20)(?:2|3)[3-9])/).isRequired('Inputan harus diisi.'),
});
const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const UpdateSiswa = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [defaultData, setDefaultData] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate()
  const { idSiswa } = useParams()
  const dispatch = useDispatch()

  const dispath = useDispatch()
  const siswa = useSelector((state) => siswaSelector.selectById(state, idSiswa))

  React.useEffect(() => {
    dispath(getSiswa())
  }, [dispath])


  React.useEffect(() => {
    if (siswa != undefined) {
      setDefaultData(siswa)
    }
  }, [siswa])
  
  // console.log(siswa);

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    const selectedForm = ['nis', 'nisn', "nama_lengkap", "alamat", "no_telp", "email", "password", "tahun_masuk", "id"];
    let data = Object.keys(formValue)
      .filter(key => selectedForm.includes(key))
      .reduce((obj, key) => {
        obj[key] = formValue[key];
        return obj;
      }, {});
    // console.log(data, 'Form Value');
    // console.log();
    if (formRef.current.check()) {
      const res = await dispatch(updateSiswa(data))

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
        navigate("/admin/daftar-siswa")
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
              <Breadcrumb.Item href='/admin/daftar-siswa'>Daftar Siswa</Breadcrumb.Item>
              <Breadcrumb.Item aria-current="page" active>Tambah Siswa</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
        shaded
      >
        <Form
          ref={formRef}
          onChange={setFormValue}
          formValue={defaultData}
          // onChange={defaultData => {
          //   setFormValue(defaultData)
          //   setDefaultData(defaultData)
          // }}
          model={model}
        >
          <Form.Group controlId="nisn">
            <Form.ControlLabel>NISN</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="nisn"
              errorPlacement='bottomEnd'
              placeholder="31231... "
              value={defaultData?.nisn}
              onChange={(data) => {
                setDefaultData({...defaultData, nisn: data})
                // console.log(data)
              }}
              />
            <Form.HelpText>NISN harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="nis">
            <Form.ControlLabel>NIS</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="nis"
              errorPlacement='bottomEnd'
              placeholder="31231... "
              value={defaultData?.nis}
              onChange={(data) => setDefaultData({...defaultData, nis: data})}
              />
            <Form.HelpText>NIS harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="nama_lengkap">
            <Form.ControlLabel>Nama Lengkap</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="nama_lengkap"
              errorPlacement='bottomEnd'
              placeholder="Nama Lengkap"
              value={defaultData?.nama_lengkap}
              onChange={(data) => setDefaultData({...defaultData, nama_lengkap: data})}
              />
            <Form.HelpText>Nama harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="alamat">
            <Form.ControlLabel>Alamat Lengkap</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              // as="textarea"
              accepter={Textarea}
              name="alamat"
              errorPlacement='bottomEnd'
              placeholder="Alamat Lengkap "
              rows={5}
              required
              value={defaultData?.alamat}
              onChange={(data) => setDefaultData({...defaultData, alamat: data})}
              />

            <Form.HelpText>Alamat harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="no_telp">
            <Form.ControlLabel>No telp</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="no_telp"
              errorPlacement='bottomEnd'
              type='tel'
              placeholder="081234567890 "
              value={defaultData?.no_telp}
              onChange={(data) => setDefaultData({...defaultData, no_telp: data})}
              />
            <Form.HelpText>No telp harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="email"
              errorPlacement='bottomEnd'
              placeholder='test@gmail.com'
              required
              value={defaultData?.email}
              onChange={(data) => setDefaultData({...defaultData, email: data})}
              />
            <Form.HelpText>Email harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <InputGroup inside className='!w-[700px]'>
              <Form.Control
              type={visible ? 'text' : 'password'}
              name="password"
              placeholder='Masukkan password'
              required
              value={defaultData?.password}
              onChange={(data) => setDefaultData({...defaultData, password: data})}
              />
              <InputGroup.Button onClick={handleChange}>
                {visible ? <EyeIcon /> : <EyeSlashIcon />}
              </InputGroup.Button>
            </InputGroup>
            <Form.HelpText>Password harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="tahun_masuk">
            <Form.ControlLabel>Tahun Masuk</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="tahun_masuk"
              errorPlacement='bottomEnd'
              placeholder='Masukkan tahun masuk'
              value={defaultData?.tahun_masuk}
              onChange={(data) => setDefaultData({...defaultData, tahun_masuk: data})}
            />
            <Form.HelpText>Tahun Masuk harus diisi</Form.HelpText>
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

export default UpdateSiswa