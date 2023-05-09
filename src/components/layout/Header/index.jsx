import React, { useRef } from 'react';
import {
  Dropdown,
  Popover,
  Whisper,
  Navbar,
  Nav,
  Avatar,
} from 'rsuite';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const renderAdminSpeaker = ({ onClose, left, top, className }, ref) => {
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          <strong>Administrator</strong>
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Set status</Dropdown.Item>
        <Dropdown.Item>Profile & account</Dropdown.Item>
        <Dropdown.Item>Feedback</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
        <Dropdown.Item
          icon={<HelpOutlineIcon />}
          href="https://rsuitejs.com"
          target="_blank"
          as="a"
        >
          Help{' '}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const Header = ({ title }) => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const handleLogout = () => {
    cookies.remove("token", {
      path: "/",
      expires: new Date(new Date().getTime() + 200 * 1000)
    });
    navigate("/")
  }

  return (
    <Navbar className="bg-white shadow">
      <Navbar.Brand>{title}</Navbar.Brand>
      <Nav pullRight>
        <Dropdown placement='bottomEnd' icon={
          <Avatar
            size="sm"
            circle
            src="https://avatars.githubusercontent.com/u/1203827"
            alt="@simonguo"
            style={{ marginLeft: 8 }}
          />
        }>
          <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
            <p>Signed in as</p>
            <strong>Administrator</strong>
          </Dropdown.Item>
          <Dropdown.Item divider />
          <Dropdown.Item>Set status</Dropdown.Item>
          <Dropdown.Item>Profile & account</Dropdown.Item>
          <Dropdown.Item>Feedback</Dropdown.Item>
          <Dropdown.Item divider />
          <Dropdown.Item>Settings</Dropdown.Item>
          {/* <Link className='hover:no-underline' to={"/"}> */}
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          {/* </Link> */}
          <Dropdown.Item
            icon={<HelpOutlineIcon />}
            href="https://rsuitejs.com"
            target="_blank"
            as="a"
          >
            Help{' '}
          </Dropdown.Item>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;