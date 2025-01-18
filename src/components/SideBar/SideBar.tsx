import { BugFilled, LogoutOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import columnStore from '../../stores/columnStore';
import userStore from '../../stores/userStore';
import { Modal4Column } from '../Modal4Columns/SingleModal';
import { Button } from '../ui/Button/Button';
import st from './sidebar.module.scss';
import logo from '/src/assets/images/logo.png';

const { Sider } = Layout;

export const SideBar = () => {
	const { removeUser } = userStore;
	const isAuth = !!userStore.user?.token;
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState('');

	const openModal = (title: string) => {
		setModalTitle(title);
		setIsOpen(true);
	};

	const closeModal = () => setIsOpen(false);

	const menuItems: MenuProps['items'] = [
		{
			key: '0',
			icon: <BugFilled />,
			label: 'Create Board',
			onClick: () => openModal('Create board'),
		},
		{
			key: '3',
			label: 'Boards',
			type: 'group',
			children: columnStore.boards.map((board, index) => ({
				key: `board-${index}`,
				icon: <BugFilled />,
				label: board.title,
				onClick: () => navigate(`/board/${board.id}`),
			})),
		},
	];

	return (
		<>
			<Sider
				width={300}
				breakpoint='xxl'
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
				title={modalTitle}
				closeModalCol={closeModal}
				isOpenCol={isOpen}
			/>
		</>
	);
};
