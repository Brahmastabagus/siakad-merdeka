import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, InputGroup, Input, DatePicker } from 'rsuite'
import { getTahunAjaran, tahunAjaranSelector, updateTahunAjaran } from '../../../store/tahunAjaranSlice';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  semester: NumberType('Tahun masuk harus angka').isRequired('Inputan harus diisi.'),
  kode: StringType().isRequired('Inputan harus diisi.'),
  deskripsi: StringType().isRequired('Inputan harus diisi.'),
});
const Textarea = React.forwardRef((props, ref) => <Input {...props} ref={ref} as="textarea" />)

const UpdateTahunAjaran = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [defaultData, setDefaultData] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate()
  const { idTahunAjaran } = useParams()
  const dispatch = useDispatch()

  const dispath = useDispatch()
  const tahunAjaran = useSelector((state) => tahunAjaranSelector.selectById(state, idTahunAjaran))

  React.useEffect(() => {
    dispath(getTahunAjaran())
  }, [dispath])


  React.useEffect(() => {
    if (tahunAjaran != undefined) {
      setDefaultData(tahunAjaran)
    }
  }, [tahunAjaran])

  // console.log(tahunAjaran);

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
    formValue.tgl_mulai = dater(formValue.tgl_mulai)
    formValue.tgl_selesai = dater(formValue.tgl_selesai)
    if (formRef.current.check()) {
      const res = await dispatch(updateTahunAjaran(formValue))
      console.log(res);

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
              <Breadcrumb.Item>Daftar Dapodik</Breadcrumb.Item>
              <Breadcrumb.Item href='/admin/daftar-tahun-ajaran'>Daftar Tahun Ajaran</Breadcrumb.Item>
              <Breadcrumb.Item aria-current="page" active>Update Tahun Ajaran</Breadcrumb.Item>
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
          <Form.Group controlId="kode">
            <Form.ControlLabel>Kode</Form.ControlLabel>
            <Form.Control
              // classKode='!w-[700px]'
              name="kode"
              errorPlacement='bottomEnd'
              placeholder="Kode"
              value={defaultData?.kode}
              onChange={(data) => setDefaultData({ ...defaultData, kode: data })}
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
              value={defaultData?.semester}
              onChange={(data) => setDefaultData({ ...defaultData, semester: data })}
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
              value={defaultData?.kode ? new Date(defaultData?.tgl_mulai) : new Date()}
              onChange={(data) => setDefaultData({ ...defaultData, tgl_mulai: data })}
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
              value={defaultData?.kode ? new Date(defaultData?.tgl_selesai) : new Date()}
              onChange={(data) => setDefaultData({ ...defaultData, tgl_selesai: data })}
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
              value={defaultData?.deskripsi}
              onChange={(data) => setDefaultData({ ...defaultData, deskripsi: data })}
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

export default UpdateTahunAjaran