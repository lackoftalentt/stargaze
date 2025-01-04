import { CheckOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import st from './sidebar.module.scss';
import logo from '/src/assets/images/logo.png';
const { Sider } = Layout;

export const SideBar = () => {
	return (
		<Sider
			width={300}
			breakpoint='lg'
			theme='light'
			collapsedWidth='0'
			className={`${st.sidebar}`}
		>
			<div className={`${st.sidebarHeader}`}>
				<img src={logo} className={`${st.sidebarLogo}`} alt='Logo' />
			</div>
			<Divider style={{ margin: 0 }} />
			<div className={`demo-logo-vertical`} />
			<Menu
				className={`${st.menu}`}
				theme='light'
				mode='inline'
				defaultSelectedKeys={['1']}
			>
				<Menu.Item key='1' icon={<HomeOutlined />}>
					Home
				</Menu.Item>
				<Menu.Item key='2' icon={<CheckOutlined />}>
					Completed
				</Menu.Item>
				<Menu.Item key='3' icon={<UserOutlined />}>
					Profile
				</Menu.Item>
			</Menu>
		</Sider>
	);
};
