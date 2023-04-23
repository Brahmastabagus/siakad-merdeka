import React from 'react'
import { Breadcrumb, Panel, Form, Button, ButtonToolbar, Schema, InputPicker, InputNumber } from 'rsuite'

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  elemen: StringType().isRequired('Inputan harus diisi.'),
  tujuan: StringType().isRequired('Inputan harus diisi.'),
  lingkup: StringType().isRequired('Inputan harus diisi.'),
  kelas: StringType().isRequired('Inputan harus diisi.'),
  jp: NumberType('Age should be a number').isRequired('Inputan harus diisi.'),
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}

const selectData = ['1/1', '1/2', '2/1', '2/2', '3/1', '3/2'].map(item => ({
  label: item,
  value: item
}));

const TujuanPembelajaran = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});

  const handleSubmit = () => {
    console.log(formValue, 'Form Value');
  };
  return (
    <>
      <Panel
        header={
          <>
            <Breadcrumb>
              <Breadcrumb.Item>Instrumen 1</Breadcrumb.Item>
              <Breadcrumb.Item active>Tujuan</Breadcrumb.Item>
            </Breadcrumb>
          </>
        }
        shaded
      >
        <Form model={model} onChange={setFormValue} ref={formRef}>
          <Form.Group controlId="elemen">
            <Form.ControlLabel>Elemen</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="elemen"
              errorPlacement='bottomEnd'
              placeholder="Bilangan, Aljabar, Pengukuran, ... "
            />
            <Form.HelpText>Elemen harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="tujuan">
            <Form.ControlLabel>Tujuan Pembelajaran</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="tujuan"
              errorPlacement='bottomEnd'
              placeholder="Peserta didik mampu ..."
              ac
            />
            <Form.HelpText>Tujuan harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="lingkup">
            <Form.ControlLabel>Ruang Lingkup Materi</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="lingkup"
              errorPlacement='bottomEnd'
              placeholder="Lingkup Materi "
            />
            <Form.HelpText>Lingkup harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="kelas">
            <Form.ControlLabel>Kelas/Semester</Form.ControlLabel>
            <Form.Control className='!w-[700px]' name="kelas" accepter={InputPicker} data={selectData} errorPlacement='bottomEnd' />
            <Form.HelpText>Kelas harus diisi</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="jp">
            <Form.ControlLabel>JP</Form.ControlLabel>
            <Form.Control
              className='!w-[700px]'
              name="jp"
              errorPlacement='bottomEnd'
              accepter={InputNumber}
              step={2}
              defaultValue={2}
            />
            <Form.HelpText>JP harus diisi</Form.HelpText>
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

export default TujuanPembelajaran