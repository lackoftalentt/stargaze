import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import columnStore from '../../stores/columnStore';
import modalStore from '../../stores/modalStore';
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

	const deleteColumn = () => {
		columnStore.deleteColumn(columnId, boardId);
	};

	return (
		<div className={s.column}>
			<div className={s.columnHeader}>
				<h2 className={s.columnTitle}>{title}</h2>
				<div className={s.columnActionsBtn}>
					<PlusOutlined
						onClick={() => modalStore.openTaskModal('Create task')}
						className={s.addTaskBtn}
					/>
					<EditOutlined
						onClick={() => modalStore.openColumnModal('Edit column')}
						className={s.editBtn}
					/>
					<DeleteOutlined onClick={deleteColumn} className={s.deleteBtn} />
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
												openModal={() =>
													modalStore.openTaskModal('Edit', task.id)
												}
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

			{modalStore.modalIsOpen && (
				<Modal
					taskId={modalStore.taskId}
					boardId={boardId}
					title={
						modalStore.modalMode === 'Create task' ? 'Create Task' : 'Edit Task'
					}
					columnId={columnId}
				/>
			)}

			{modalStore.colModalIsOpen && (
				<Modal4Column columnId={columnId} title={modalStore.colModalMode} />
			)}
		</div>
	);
});
