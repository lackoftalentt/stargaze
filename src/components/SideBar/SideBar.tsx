import { BugFilled, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu, MenuProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import boardStore from '../../stores/boardStore';
import modalStore from '../../stores/modalStore';
import userStore from '../../stores/userStore';
import { Modal4Column } from '../Modal4Columns/SingleModal';
import { Button } from '../ui/Button/Button';
import st from './sidebar.module.scss';
import logo from '/src/assets/images/logo.png';

const { Sider } = Layout;

export const SideBar = observer(() => {
	const { removeUser } = userStore;
	const navigate = useNavigate();

	const menuItems: MenuProps['items'] = [
		{
			key: '1',
			label: 'Boards',
			type: 'group',
			children: boardStore.boards.map(board => ({
				key: board.id,
				icon: <BugFilled />,
				label: board.title,
				onClick: () => {
					navigate(`/board/${board.id}`);
				},
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
				className={st.sidebar}
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
				<div className={st.huesos}>
					<p className={st.nickname}>{userStore.user?.userName}</p>
					<LogoutOutlined onClick={() => removeUser()} />
				</div>
				<Divider style={{ margin: 0 }} />
				<div className={st.createBoard}>
					<span onClick={() => modalStore.openColumnModal('Create board')}>
						<Button className={st.createBoardBtn}>
							Create Board <PlusOutlined />
						</Button>
					</span>
				</div>
				<Menu
					className={`${st.menu}`}
					theme='light'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={menuItems}
				/>
			</Sider>

			<Modal4Column title={modalStore.colModalMode} />
		</>
	);
});
