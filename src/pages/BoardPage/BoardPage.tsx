import { EditFilled, PlusCircleTwoTone } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Column } from '../../components/Column/Column';
import { Modal4Column } from '../../components/Modal4Columns/SingleModal';
import boardStore from '../../stores/boardStore';
import authStore from '../../stores/userStore';
import s from './BoardPage.module.scss';

export const BoardPage = observer(() => {
	const isAuth = authStore.user?.token;
	const navigate = useNavigate();
	const { id } = useParams<{ id: string | undefined }>();

	const [isOpen, setIsOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const board = boardStore.getBoardById(id);

	const openModal = (title: string, boardId?: string) => {
		setModalTitle(title);
		setIsOpen(true);
		if (boardId) {
			setModalTitle(title);
		}
	};

	const closeModalCol = () => setIsOpen(false);

	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth, navigate]);

	return (
		<>
			<main className={s.board}>
				<div className={s.boardHeader}>
					<h1 className={s.boardTitle}>{board?.title || 'Board Not Found'}</h1>
					<PlusCircleTwoTone
						onClick={() => openModal('Create column')}
						size={20}
						className={s.addColumnBtn}
					/>
					<EditFilled
						onClick={() => openModal('Edit board', board?.id)}
						size={20}
						className={s.editBoardBtn}
					/>
				</div>
				<div className={s.columnContainer}>
					{board?.columns.map(column => (
						<Column key={column.id} title={column.title} columnId={column.id} />
					)) || <p>No columns available</p>}
				</div>
			</main>
			<Modal4Column
				boardId={id}
				closeModalCol={closeModalCol}
				isOpenCol={isOpen}
				title={modalTitle}
			/>
		</>
	);
});
