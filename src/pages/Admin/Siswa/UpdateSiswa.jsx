import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, InputGroup, Input, DatePicker } from 'rsuite'
import { getSiswa, siswaSelector, updateSiswa } from '../../../store/siswaSlice';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  nisn: NumberType("NISN harus angka").isRequired('Inputan harus diisi.'),
  name: StringType().isRequired('Inputan harus diisi.'),
  tahun_masuk: NumberType('Tahun masuk harus angka').pattern(/(?:(?:20)(?:2|3)[3-9])/).isRequired('Inputan harus diisi.'),
});
const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const UpdateSiswa = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [defaultData, setDefaultData] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate()
  const { idSiswa, idKelas } = useParams()
  const dispatch = useDispatch()

  const dispath = useDispatch()
  const siswa = useSelector((state) => siswaSelector.selectById(state, idSiswa))

  React.useEffect(() => {
    dispath(getSiswa())
  }, [dispath])


  React.useEffect(() => {
    if (siswa != undefined) {
      if (siswa.tanggal_lahir != undefined) {
        setDefaultData(siswa)
        console.log(siswa);
      }
    }
  }, [siswa])

  // console.log(siswa);

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    let year = new Date(formValue.tanggal_lahir).getFullYear()
    let month = new Date(formValue.tanggal_lahir).getMonth() + 1
    month = month.toString().padStart(2, '0');
    let date = new Date(formValue.tanggal_lahir).getDate()
    date = date.toString().padStart(2, '0');
    formValue.tanggal_lahir = `${year}-${month}-${date}`
    const selectedForm = ["name", "nisn", "tahun_masuk", "tanggal_lahir", "id"];
    let data = Object.keys(formValue)
      .filter(key => selectedForm.includes(key))
      .reduce((obj, key) => {
        obj[key] = formValue[key];
        return obj;
      }, {});
    // console.log(data, 'Form Value');
    // console.log();
    data = {
      ...data,
      kelas_id: defaultData.plot_siswa.kelas_id
    }
    if (formRef.current.check()) {
      // console.log(data);
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
              <Breadcrumb.Item>Daftar Dapodik</Breadcrumb.Item>
              <Breadcrumb.Item href='/admin/daftar-siswa'>Daftar Siswa</Breadcrumb.Item>
              <Breadcrumb.Item aria-current="page" active>Update Siswa</Breadcrumb.Item>
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
          fluid
        >
          <Form.Group controlId="nisn">
            <Form.ControlLabel>NISN</Form.ControlLabel>
            <Form.Control
              // classNisn='!w-[700px]'
              nisn="nisn"
              errorPlacement='bottomEnd'
              placeholder="NISN"
              value={defaultData?.nisn}
              onChange={(data) => setDefaultData({ ...defaultData, nisn: data })}
            />
            <Form.HelpText>Nama harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.ControlLabel>NISN</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="name"
              errorPlacement='bottomEnd'
              placeholder="Nama Lengkap"
              value={defaultData?.name}
              onChange={(data) => setDefaultData({ ...defaultData, name: data })}
            />
            <Form.HelpText>Nama harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="tahun_masuk">
            <Form.ControlLabel>Tahun Masuk</Form.ControlLabel>
            <Form.Control
              // className='!w-[700px]'
              name="tahun_masuk"
              errorPlacement='bottomEnd'
              placeholder='Masukkan tahun masuk'
              value={defaultData?.tahun_masuk}
              onChange={(data) => setDefaultData({ ...defaultData, tahun_masuk: data })}
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
              value={defaultData?.name ? new Date(defaultData?.tanggal_lahir) : new Date()}
              onChange={(data) => setDefaultData({ ...defaultData, tanggal_lahir: data })}
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