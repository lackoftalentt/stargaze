import {
	ControlOutlined,
	HomeTwoTone,
	LogoutOutlined,
} from '@ant-design/icons';
import { Divider, Layout, Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import columnStore from '../../stores/columnStore';
import userStore from '../../stores/userStore';
import { Modal4Column } from '../Modal4Columns/Modal4Column';
import { Button } from '../ui/Button/Button';
import st from './sidebar.module.scss';
import logo from '/src/assets/images/logo.png';

const { Sider } = Layout;

export const SideBar = () => {
	const { removeUser } = userStore;
	const isAuth = !!userStore.user?.token;
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => setIsOpen(false);

	const menuItems: MenuProps['items'] = [
		{
			key: '1',
			icon: <HomeTwoTone />,
			label: 'Board',
			onClick: () => navigate('/'),
		},
		...(columnStore.columns.length < 4
			? [
					{
						key: '2',
						icon: <ControlOutlined />,
						label: 'Create column',
						onClick: () => setIsOpen(true),
					},
			  ]
			: []),
		{
			key: '3',
			label: 'Projects',
			type: 'group',
			children: [
				{ key: '13', icon: <ControlOutlined />, label: 'Option 13' },
				{ key: '14', icon: <ControlOutlined />, label: 'Option 14' },
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
				{isAuth && (
					<div className={st.sidebarFooter}>
						<Button className={st.sidebarButton} onClick={() => removeUser()}>
							logout <LogoutOutlined />
						</Button>
					</div>
				)}
			</Sider>

			<Modal4Column
				title='Create'
				closeModalCol={closeModal}
				isOpenCol={isOpen}
			/>
		</>
	);
};
