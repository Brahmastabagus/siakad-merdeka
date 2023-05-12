import React from 'react';
import { Form, Button, Panel, IconButton, Stack, Divider, InputGroup, Schema, toaster, Message, Notification } from 'rsuite';
import { Link, useNavigate } from 'react-router-dom';
import GithubIcon from '@rsuite/icons/legacy/Github';
import FacebookIcon from '@rsuite/icons/legacy/Facebook';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import WechatIcon from '@rsuite/icons/legacy/Wechat';
import schoolImg from '../../../assets/images/school-img.svg'
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { toast } from 'react-toastify';
import { getLogin } from '../../../store/loginSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
// import Brand from './components/Brand';

const { StringType } = Schema.Types;
const model = Schema.Model({
  email: StringType().isEmail('Email required').isRequired('Email harus diisi.'),
  password: StringType().isRequired('Password harus diisi.'),
});
const Index = () => {
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
      // if (isAccEqual(formValue, data)) {
      //   toast.success("Anda berhasil masuk sebagai admin", {
      //     position: "top-center",
      //     autoClose: 2000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //   });
      //   // }, 100);
      //   navigate("/admin/daftar-siswa")
      // } else {
      //   toaster.push(<Message type="error">Error</Message>);
      // }
      const res = await dispatch(getLogin(formValue))
      // if (res) {
        const cookies = new Cookies();
        let token = res.payload.token
        cookies.set("token", token, {
          path: "/",
          expires: new Date(new Date().getTime() + 200 * 1000)
        });
        let role = res.payload.data.role.name
        
      // }
      // console.log(res)

      if (res.meta.requestStatus === "fulfilled") {
        // setTimeout(() => {
          toast.success(`Anda berhasil masuk sebagai ${role}`, {
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
        navigate(`/${role.toLowerCase()}`)
      } else {
        toaster.push(<Message type="error">Error</Message>);
      }
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

      <Panel bordered className='bg-white w-[250px] m-auto min-[330px]:w-[350px] sm:w-[450px] md:w-[450px] lg:w-[450px] xl:w-[450px]' header={<h3>Sign In</h3>}>
        <p style={{ marginBottom: 10 }}>
          <span className="text-muted">New Here? </span>{' '}
          <Link className='cursor-pointer' to="/register"> Create an Account</Link>
        </p>

        <Panel bordered className="w-full mb-4">
          <p className='text-muted'>Test account:</p>
          <p className='text-muted'>Email: arya@gmail.com</p>
          <p className='text-muted'>Password: qweasdzxc</p>
        </Panel>

        <Form
          ref={formRef}
          onChange={setFormValue}
          model={model}
          fluid
        >
          <Form.Group controlId='email'>
            <Form.ControlLabel>Email address</Form.ControlLabel>
            <Form.Control name="email" placeholder='email@gmail.com' />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.ControlLabel>
              <span>Password</span>
              <Link to='/lupa-password' style={{ float: 'right' }}>Forgot password?</Link>
            </Form.ControlLabel>
            <InputGroup inside>
              <Form.Control type={visible ? 'text' : 'password'} name="password" placeholder='Masukkan password' autoComplete='off' required />
              <InputGroup.Button onClick={handleChange}>
                {visible ? <EyeIcon /> : <EyeSlashIcon />}
              </InputGroup.Button>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button className='bg-sky-500' appearance="primary" type="submit" onClick={handleSubmit}>Sign in</Button>
              <Stack spacing={6}>
                <IconButton icon={<WechatIcon />} appearance="subtle" />
                <IconButton icon={<GithubIcon />} appearance="subtle" />
                <IconButton icon={<FacebookIcon />} appearance="subtle" />
                <IconButton icon={<GoogleIcon />} appearance="subtle" />
              </Stack>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

export default Index;