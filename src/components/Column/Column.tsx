import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import columnStore from '../../stores/columnStore';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import { Modal } from '../Modal/Modal';
import { Modal4Column } from '../Modal4Columns/SingleModal';
import s from './Column.module.scss';

interface ColumnProps {
	title?: string;
	columnId: string;
}

export const Column = observer(({ title, columnId }: ColumnProps) => {
	const { id: boardId } = useParams<{ id: string }>();

	const tasks = columnStore.getTasksForColumn(columnId);

	// Локальные стейты для управления модалками
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
	const [selectedColumnId, setSelectedColumnId] = useState<string>(''); // Для передачи в модалки

	// Открытие модалки для задач
	const openTaskModal = (columnId: string) => {
		setIsTaskModalOpen(true);
		setSelectedColumnId(columnId);
	};

	// Закрытие модалки для задач
	const closeTaskModal = () => {
		setIsTaskModalOpen(false);
		setSelectedColumnId('');
	};

	// Открытие модалки для колонок
	const openColumnModal = (columnId: string) => {
		setIsColumnModalOpen(true);
		setSelectedColumnId(columnId);
	};

	// Закрытие модалки для колонок
	const closeColumnModal = () => {
		setIsColumnModalOpen(false);
		setSelectedColumnId('');
	};

	return (
		<div className={s.column}>
			<div className={s.columnHeader}>
				<h2 className={s.columnTitle}>{title}</h2>
				<div className={s.columnActionsBtn}>
					{/* Открытие модалки для создания задачи */}
					<PlusOutlined
						onClick={() => openTaskModal(columnId)}
						className={s.addTaskBtn}
					/>
					{/* Открытие модалки для редактирования колонки */}
					<EditOutlined
						onClick={() => openColumnModal(columnId)}
						className={s.editBtn}
					/>
					{/* Удаление колонки */}
					<DeleteOutlined
						onClick={() => columnStore.deleteColumn(columnId, boardId)}
						className={s.deleteBtn}
					/>
				</div>
			</div>
			<div className={s.taskContainer}>
				<Droppable droppableId={columnId} type='TASK'>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className={s.droppableContainer}
						>
							{tasks.map((task, index) => (
								<Draggable key={task.id} draggableId={task.id} index={index}>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<ColumnItem
												boardId={boardId}
												task={task}
												columnId={columnId}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>

			{/* Модалки для задач */}
			{isTaskModalOpen && (
				<Modal
					title={'Create task'}
					columnId={selectedColumnId}
					onClose={closeTaskModal}
					isOpen={isTaskModalOpen}
				/>
			)}

			{isColumnModalOpen && (
				<Modal4Column
					title={'Edit column'}
					columnId={selectedColumnId}
					isOpen={isColumnModalOpen}
					onClose={closeColumnModal}
				/>
			)}
		</div>
	);
});
