import { CodeSandboxCircleFilled, HomeTwoTone, LogoutOutlined, ProjectTwoTone } from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router';
import userStore from '../../stores/userStore';
import { Button } from '../ui/button/button';
import st from './sidebar.module.scss';
import logo from '/src/assets/images/logo.png';

const { Sider } = Layout;

export const SideBar = () => {
	const { removeUser } = userStore;
	const isAuth = !!userStore.user?.token;
	const navigate = useNavigate();

	const menuItems = [
		{
			key: '1',
			icon: <HomeTwoTone />,
			label: 'Board',
			onClick: () => navigate('/'),
		},
		{
			key: '2',
			icon: <ProjectTwoTone />,
			label: 'Projects',
			onClick: () => navigate(`/`),
			children: [
				{
					key: '2',
					icon: <CodeSandboxCircleFilled />,
					label: 'Sex',
					onClick: () => navigate('/'),
				},
			],
		},
	];

	return (
		<>
			<Sider
				width={300}
				breakpoint='lg'
				theme='light'
				collapsedWidth='0'
				className={`${st.sidebar}`}
			>
				<div className={`${st.sidebarHeader}`}>
					<img
						src={logo}
						onClick={() => navigate('/')}
						className={`${st.sidebarLogo}`}
						alt='Logo'
					/>
				</div>
				<Divider style={{ margin: 0 }} />
				<div className={`demo-logo-vertical`} />
				<Menu
					className={`${st.menu}`}
					theme='light'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={menuItems}
				/>
				{isAuth ? (
					<div className={st.sidebarFooter}>
						<Button className={st.sidebarButton} onClick={() => removeUser()}>
							logout <LogoutOutlined/>
						</Button>
					</div>
				) : null}
			</Sider>
		</>
	);
};
