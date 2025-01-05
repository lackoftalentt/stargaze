import { CheckOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router';
import st from './sidebar.module.scss';
import logo from '/src/assets/images/logo.png';

const { Sider } = Layout;

export const SideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Board',
      onClick: () => navigate('/'),
    },
    {
      key: '2',
      icon: <CheckOutlined />,
      label: 'Completed',
      onClick: () => navigate('/huesos'),
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/tsukumi'),
    },
  ];

  return (
    <Sider
      width={300}
      breakpoint="lg"
      theme="light"
      collapsedWidth="0"
      className={`${st.sidebar}`}
    >
      <div className={`${st.sidebarHeader}`}>
        <img
          src={logo}
          onClick={() => navigate('/')}
          className={`${st.sidebarLogo}`}
          alt="Logo"
        />
      </div>
      <Divider style={{ margin: 0 }} />
      <div className={`demo-logo-vertical`} />
      <Menu
        className={`${st.menu}`}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
      />
    </Sider>
  );
};
