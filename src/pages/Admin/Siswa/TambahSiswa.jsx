import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, InputPicker, InputNumber, DatePicker, InputGroup, Input, toaster } from 'rsuite'
import { setSiswa } from '../../../store/siswaSlice';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  nisn: NumberType("NISN harus angka").isRequired('Inputan harus diisi.'),
  name: StringType().isRequired('Inputan harus diisi.'),
  tahun_masuk: NumberType('Tahun masuk harus angka').pattern(/(?:(?:20)(?:2|3)[3-9])/).isRequired('Inputan harus diisi.'),
});
const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const TambahSiswa = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate()

  // const { title } = useSelector(state => state.siswa)
  // const [loca, setLoca] = React.useState(useLocation());
  // const dispatch = useDispatch()

  // // React.useEffect(() => {
  // // }, [locations])

  // React.useEffect(() => {
  //   const locations = loca.pathname.split("/")[2].split("-")
  //   for (var i = 0; i < locations.length; i++) {
  //     locations[i] = locations[i].charAt(0).toUpperCase() + locations[i].slice(1);
  //   }

  //   const title = locations.join(" ")
  //   dispatch(update({title}))
  //   console.log(dispatch(update({ title })));
  // }, [])
  // console.log(title);

  const dispatch = useDispatch()


  const handleChange = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    // console.log();
    if (formRef.current.check()) {
      let year = new Date(formValue.tanggal_lahir).getFullYear()
      let month = new Date(formValue.tanggal_lahir).getMonth() + 1
      month = month.toString().padStart(2, '0');
      let date = new Date(formValue.tanggal_lahir).getDate()
      date = date.toString().padStart(2, '0');
      formValue.tanggal_lahir = `${year}-${month}-${date}`
      console.log(formValue, 'Form Value');
      const res = await dispatch(setSiswa(formValue))

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
              <Breadcrumb.Item>Daftar Dapodik</Breadcrumb.Item>
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
          model={model}
          fluid
        >
          <Form.Group controlId="nisn">
            <Form.ControlLabel>NISN</Form.ControlLabel>
            <Form.Control
              // classNisn='!w-[700px]'
              name="nisn"
              errorPlacement='bottomEnd'
              placeholder="NISN"
            />
            <Form.HelpText>Nama harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.ControlLabel>Nama Lengkap</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="name"
              errorPlacement='bottomEnd'
              placeholder="Nama Lengkap"
            />
            <Form.HelpText>Nama Lengkap harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="tahun_masuk">
            <Form.ControlLabel>Tahun Masuk</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="tahun_masuk"
              errorPlacement='bottomEnd'
              placeholder='Masukkan tahun masuk'
            />
            <Form.HelpText>Tahun Masuk harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="tanggal_lahir">
            <Form.ControlLabel>Tanggal Lahir</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              accepter={DatePicker}
              oneTap
              block
              name="tanggal_lahir"
              errorPlacement='bottomEnd'
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

export default TambahSiswa