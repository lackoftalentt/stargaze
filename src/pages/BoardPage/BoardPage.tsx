import { DeleteOutlined, EditFilled, PlusOutlined } from '@ant-design/icons';
import { toJS } from 'mobx'; // Важно для преобразования наблюдаемых объектов
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router';
import { Column } from '../../components/Column/Column';
import { Modal4Column } from '../../components/Modal4Columns/SingleModal';
import boardStore from '../../stores/boardStore';
import authStore from '../../stores/userStore';
import s from './BoardPage.module.scss';

export const BoardPage = observer(() => {
	const isAuth = authStore.user?.token;
	const navigate = useNavigate();
	const { id: boardId } = useParams<{ id: string }>();

	const [isOpen, setIsOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const board = boardStore.getBoardById(boardId);
	const deleteBoardHandle = () => {
		boardStore.deleteBoard(boardId);
		navigate('/');
	};

	const openModal = (title: string) => {
		setModalTitle(title);
		setIsOpen(true);
	};

	const closeModalCol = () => setIsOpen(false);

	const onDragEnd = (result: DropResult) => {
		const { source, destination, type } = result;

		if (!destination) return;

		if (type === 'COLUMN') {
			if (source.index === destination.index) return;
			const boardColumns = boardStore.boards.find(
				board => board.id === boardId
			)?.columns;

			if (!boardColumns) {
				console.error('Columns not found');
				return;
			}

			const [movedColumn] = boardColumns.splice(source.index, 1);
			boardColumns.splice(destination.index, 0, movedColumn);

			boardStore.updateBoardColumns(boardId, [...boardColumns]);
			return;
		}

		if (type === 'TASK') {
			if (
				source.droppableId === destination.droppableId &&
				source.index === destination.index
			) {
				return;
			}

			const columns = boardStore.boards.find(
				board => board.id === boardId
			)?.columns;

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
				const tasks = [...sourceColumn.tasks];
				const [movedTask] = tasks.splice(source.index, 1);
				tasks.splice(destination.index, 0, movedTask);

				boardStore.updateColumnTasks(sourceColumn.id, tasks);
			} else {
				const sourceTasks = [...sourceColumn.tasks];
				const destinationTasks = [...destinationColumn.tasks];

				const [movedTask] = sourceTasks.splice(source.index, 1);
				destinationTasks.splice(destination.index, 0, movedTask);

				boardStore.updateColumnTasks(sourceColumn.id, sourceTasks);
				boardStore.updateColumnTasks(destinationColumn.id, destinationTasks);
			}
		}
	};

	useEffect(() => {
		if (!isAuth) navigate('/login');
	}, [isAuth, navigate]);

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
					<Droppable
						droppableId='board-columns'
						direction='horizontal'
						type='COLUMN'
					>
						{provided => (
							<div
								className={s.columnContainer}
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{toJS(board?.columns)?.map((column, index) => (
									<Draggable
										key={column.id}
										draggableId={column.id}
										index={index}
									>
										{provided => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<Column
													key={column.id}
													title={column.title}
													columnId={column.id}
												/>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</main>
			</DragDropContext>
			<Modal4Column
				boardId={boardId}
				closeModalCol={closeModalCol}
				isOpenCol={isOpen}
				title={modalTitle}
			/>
		</>
	);
});
