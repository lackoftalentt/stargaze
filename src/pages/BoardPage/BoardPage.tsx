import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Column } from '../../components/Column/Column';
import authStore from '../../stores/userStore';
import s from './BoardPage.module.scss'
import { Modal } from '../../components/Modal/Modal';

export const BoardPage = observer(() => {
	const isAuth = authStore.user?.token;
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth, navigate]);

	return (
		<main className={s.boardContainer}>
			<Column title='Todo' />
			<Column title='In Progress' />
			<Column title='Done' />
			<Column title='Sex' />
			<Modal/>
		</main>
	);
});
