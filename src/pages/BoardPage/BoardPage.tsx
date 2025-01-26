import { DeleteOutlined, EditFilled, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router';
import { Column } from '../../components/Column/Column';
import { Modal4Column } from '../../components/Modal4Columns/SingleModal';
import boardStore from '../../stores/boardStore';
import authStore from '../../stores/userStore';
import s from './BoardPage.module.scss';

export const BoardPage = () => {
	const isAuth = authStore.user?.token;
	const navigate = useNavigate();
	const { id: boardId } = useParams<{ id: string }>();

	const board = boardStore.getBoardById(boardId);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState('');
	const [selectedColumnId, setSelectedColumnId] = useState('');

	const deleteBoardHandle = () => {
		boardStore.deleteBoard(boardId);
		navigate('/');
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (
			!destination ||
			(source.droppableId === destination.droppableId &&
				source.index === destination.index)
		) {
			return;
		}

		const columns = board?.columns;
		if (!columns) {
			console.error('Columns not found');
			return;
		}

		const sourceColumn = columns.find(
			column => column.id === source.droppableId
		);
		const destinationColumn = columns.find(
			column => column.id === destination.droppableId
		);

		if (!sourceColumn || !destinationColumn) {
			console.error('Source or destination column not found');
			return;
		}

		if (sourceColumn.id === destinationColumn.id) {
			const tasks = Array.from(sourceColumn.tasks);
			const [movedTask] = tasks.splice(source.index, 1);
			tasks.splice(destination.index, 0, movedTask);

			boardStore.updateColumnTasks(sourceColumn.id, tasks);
		} else {
			const sourceTasks = Array.from(sourceColumn.tasks);
			const destinationTasks = Array.from(destinationColumn.tasks);

			const [movedTask] = sourceTasks.splice(source.index, 1);
			destinationTasks.splice(destination.index, 0, movedTask);

			boardStore.updateColumnTasks(sourceColumn.id, sourceTasks);
			boardStore.updateColumnTasks(destinationColumn.id, destinationTasks);
		}
	};

	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth]);

	const openModal = (mode: string, columnId: string = '') => {
		setIsModalOpen(true);
		setModalMode(mode);
		setSelectedColumnId(columnId);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setModalMode('');
		setSelectedColumnId('');
	};

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<main className={s.board}>
					<div className={s.boardHeader}>
						<h1 className={s.boardTitle}>
							{board?.title || 'Board Not Found'}
						</h1>
						<PlusOutlined
							onClick={() => openModal('Create column')}
							size={20}
							className={s.addColumnBtn}
						/>
						<EditFilled
							onClick={() => openModal('Edit board')}
							size={20}
							className={s.editBoardBtn}
						/>
						<DeleteOutlined
							onClick={deleteBoardHandle}
							size={20}
							className={s.deleteBoardBtn}
						/>
					</div>
					<div className={s.columnContainer}>
						{board?.columns?.map(column => (
							<Column
								key={column.id}
								title={column.title}
								columnId={column.id}
							/>
						))}
					</div>
				</main>
			</DragDropContext>
			{isModalOpen && (
				<Modal4Column
					isOpen={isModalOpen}
					title={modalMode}
					columnId={selectedColumnId}
					onClose={closeModal}
				/>
			)}
		</>
	);
};
