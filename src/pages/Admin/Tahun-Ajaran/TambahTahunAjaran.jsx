import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, InputPicker, InputNumber, DatePicker, InputGroup, Input, toaster } from 'rsuite'
import { setTahunAjaran } from '../../../store/tahunAjaranSlice';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  semester: NumberType('Tahun masuk harus angka').isRequired('Inputan harus diisi.'),
  kode: StringType().isRequired('Inputan harus diisi.'),
  deskripsi: StringType().isRequired('Inputan harus diisi.'),
});
const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const TambahTahunAjaran = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate()

  // const { title } = useSelector(state => state.tahunAjaran)
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

  const dater = (dates) => {
    let year = new Date(dates).getFullYear()
    let month = new Date(dates).getMonth() + 1
    month = month.toString().padStart(2, '0');
    let date = new Date(dates).getDate()
    date = date.toString().padStart(2, '0');
    dates = `${year}-${month}-${date}`

    return dates
  }

  const handleSubmit = async () => {
    // console.log();
    if (formRef.current.check()) {
      formValue.tgl_mulai = dater(formValue.tgl_mulai)
      formValue.tgl_selesai = dater(formValue.tgl_selesai)
      // console.log(formValue.tgl_mulai);
      // console.log(formValue, 'Form Value');
      const res = await dispatch(setTahunAjaran(formValue))

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
        navigate("/admin/daftar-tahun-ajaran")
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
              <Breadcrumb.Item href='/admin/daftar-tahun-ajaran'>Daftar Tahun Ajaran</Breadcrumb.Item>
              <Breadcrumb.Item aria-current="page" active>Tambah Tahun Ajaran</Breadcrumb.Item>
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
          <Form.Group controlId="kode">
            <Form.ControlLabel>Kode</Form.ControlLabel>
            <Form.Control
              // classKode='!w-[700px]'
              name="kode"
              errorPlacement='bottomEnd'
              placeholder="Kode"
            />
            <Form.HelpText>Nama harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="semester">
            <Form.ControlLabel>Semester</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              type='number'
              name="semester"
              errorPlacement='bottomEnd'
              placeholder="Semester"
            />
            <Form.HelpText>Semester harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="tgl_mulai">
            <Form.ControlLabel>Tanggal Mulai</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              accepter={DatePicker}
              oneTap
              block
              name="tgl_mulai"
              errorPlacement='bottomEnd'
            />
            <Form.HelpText>Tahun Masuk harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="tgl_selesai">
            <Form.ControlLabel>Tanggal Selesai</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              accepter={DatePicker}
              oneTap
              block
              name="tgl_selesai"
              errorPlacement='bottomEnd'
            />
            <Form.HelpText>Tanggal Selesai harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="deskripsi">
            <Form.ControlLabel>Deskripsi</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              accepter={Textarea}
              oneTap
              block
              name="deskripsi"
              errorPlacement='bottomEnd'
            />
            <Form.HelpText>Deskripsi harus diisi</Form.HelpText>
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

export default TambahTahunAjaran