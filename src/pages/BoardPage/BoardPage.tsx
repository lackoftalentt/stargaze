import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Column } from '../../components/Column/Column';
import columnStore from '../../stores/columnStore';
import authStore from '../../stores/userStore';
import s from './BoardPage.module.scss';

export const BoardPage = observer(() => {
	const isAuth = authStore.user?.token;
	const navigate = useNavigate();

	const { columns } = columnStore;
	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth, navigate]);

	return (
		<main className={s.boardContainer}>
			{columns?.map(column => (
				<Column key={column.id} title={column.title} columnId={column.id} />
			))}
		</main>
	);
});
