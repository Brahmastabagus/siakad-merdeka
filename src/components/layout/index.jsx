import React from 'react'
import { Container, Sidebar, Sidenav, Content, Navbar, Nav, FlexboxGrid } from 'rsuite';
import Header from './Header'
import { Icon } from '@rsuite/icons';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import DetailIcon from '@rsuite/icons/Detail';
import { Link, Outlet } from 'react-router-dom';
import * as AL from '../../data/index'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../store/siswaSlice';
// import * as AL from "./accessLevel/index";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const NavLink = React.forwardRef((props, ref) => {
  const { href, ...rest } = props;
  return (
    <Link to={href} {...rest}></Link>
  );
});

const Index = () => {
  const [expand, setExpand] = React.useState(true);
  const [data, setData] = React.useState([]);

  const { title } = useSelector(state => state.siswaSlice)
  const [active, setActive] = React.useState(title);

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(update({title: active}))
  }, [active])

  React.useEffect(() => {
    // let AC = user.roles[1];
    let AC = "admin";
    for (const key of Object.keys(AL)) {
      if (AC.toLowerCase() === key.toLowerCase()) {
        setData(AL[key]);
      }
    }
  }, [data]);

  // console.log(data);
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 240 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <span className='truncate' style={{ marginLeft: 12 }}> Dashboard</span>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              {/* <Nav>
                <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<GroupIcon />}>
                  User Group
                </Nav.Item>
                <Nav.Menu
                  eventKey="3"
                  trigger="hover"
                  title="Advanced"
                  icon={<MagicIcon />}
                  placement="rightStart"
                >
                  <Nav.Item as={NavLink} href="/layout/hello" eventKey="3-1">Geo</Nav.Item>
                  <Nav.Item as={NavLink} href="/layout/saya" eventKey="3-2">Devices</Nav.Item>
                  <Nav.Item eventKey="3-3">Brand</Nav.Item>
                  <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                  <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="4"
                  trigger="hover"
                  title="Settings"
                  icon={<GearCircleIcon />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="4-1">Applications</Nav.Item>
                  <Nav.Item eventKey="4-2">Websites</Nav.Item>
                  <Nav.Item eventKey="4-3">Channels</Nav.Item>
                  <Nav.Item eventKey="4-4">Tags</Nav.Item>
                  <Nav.Item eventKey="4-5">Versions</Nav.Item>
                </Nav.Menu>
              </Nav> */}
              <Nav activeKey={active}>
                {data.map((data, i) => {
                  let { id, title, icon, child } = data
                  return (
                    <>
                      <Nav.Menu
                        eventKey={id}
                        trigger="hover"
                        title={title}
                        icon={<Icon as={icon} />}
                        placement="rightStart"
                      >
                        {child.map(child => {
                          return (
                            <>
                              <Nav.Item as={NavLink} href={child.childlink} eventKey={child.id} onSelect={setActive}>{child.childtitle}</Nav.Item>
                            </>
                          )
                        })}
                      </Nav.Menu>
                    </>
                  )
                })}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container className='bg-neutral-100'>
          <Header title={active} />
          <Content className='m-5 bg-white rounded-md min-h-screen'>
            <Outlet />
          </Content>
        </Container>
      </Container>
    </div>
  );
};

export default Index