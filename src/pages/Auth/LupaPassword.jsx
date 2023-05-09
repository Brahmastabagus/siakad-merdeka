import React from 'react';
import { Form, Button, Panel, IconButton, Stack, Divider, InputGroup, Schema, toaster, Message, Notification } from 'rsuite';
import { Link, useNavigate } from 'react-router-dom';
import GithubIcon from '@rsuite/icons/legacy/Github';
import FacebookIcon from '@rsuite/icons/legacy/Facebook';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import WechatIcon from '@rsuite/icons/legacy/Wechat';
import schoolImg from '../../assets/images/school-img.svg'
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { toast } from 'react-toastify';
// import Brand from './components/Brand';

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType().isEmail('Email required').isRequired('Email harus diisi.'),
  password: StringType().isRequired('Password harus diisi.'),
});
const LupaPassword = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate()
  const data = {
    email: "admin@gmail.com",
    password: "admin123"
  }

  const handleChange = () => {
    setVisible(!visible);
  };

  function isAccEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  const Message = React.forwardRef(({ type, ...rest }, ref) => {
    return (
      <Notification ref={ref} {...rest} type={type} header={"Email atau Password salah"}>
        <p>Periksa kembali email dan password anda</p>
      </Notification>
    );
  });

  const handleSubmit = async () => {
    // console.log(formValue, 'Form Value');
    // console.log();
    if (formRef.current.check()) {
      if (isAccEqual(formValue, data)) {
        toast.success("Anda berhasil masuk sebagai admin", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // }, 100);
        navigate("/admin/daftar-siswa")
      } else {
        toaster.push(<Message type="error">Error</Message>);
      }
      // const res = await dispatch(setSiswa(formValue))

      // if (res.meta.requestStatus === "fulfilled") {
      //   // setTimeout(() => {
      //   toast.success("Data berhasil ditambahkan", {
      //     position: "top-center",
      //     autoClose: 1500,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //   });
      //   // }, 100);
      //   navigate("/admin/daftar-siswa")
      // }
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >
      {/* <Brand style={{ marginBottom: 10 }} /> */}
      <div className="mb-4">
        <img src={schoolImg} className='object-cover w-44' />
      </div>

      <Panel bordered className='bg-white w-[250px] m-auto min-[330px]:w-[350px] sm:w-[450px] md:w-[450px] lg:w-[450px] xl:w-[450px]' header={<h3>Forgot Password</h3>}>
        <p style={{ marginBottom: 10 }}>
          <span className="text-muted">Remember password? </span>{' '}
          <Link className='cursor-pointer' to="/"> Login your Account</Link>
        </p>

        <Form
          ref={formRef}
          onChange={setFormValue}
          model={model}
          fluid
        >
          <Form.Group controlId='email' className='my-5'>
            <Form.ControlLabel>Email address</Form.ControlLabel>
            <Form.Control name="email" placeholder='email@gmail.com' />
          </Form.Group>
          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button className='bg-sky-500' appearance="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

export default LupaPassword;