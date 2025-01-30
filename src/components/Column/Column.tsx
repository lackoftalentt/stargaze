import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router';
import columnStore from '../../stores/columnStore';
import modalStore from '../../stores/modalStore';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import { Modal } from '../Modal/Modal';
import { SingleModal } from '../Modal4Columns/SingleModal';
import s from './Column.module.scss';

interface ColumnProps {
	title?: string;
	columnId: string;
}

export const Column = observer(({ title, columnId }: ColumnProps) => {
	const { id: boardId } = useParams<{ id: string }>();
	const tasks = columnStore.getTasksForColumn(columnId);

	const addTask = (columnId: string | undefined) => {
		modalStore.modalMode = 'Create task';
		columnStore.columnId = columnId;
		modalStore.openTaskModal();
	};

	const editColumnHandle = () => {
		modalStore.modalMode = 'Edit column';
		columnStore.columnId = columnId;
		modalStore.openSingleModal();
	};

	const deleteColumn = () => {
		columnStore.deleteColumn(columnId, boardId);
	};

	return (
		<>
			<div className={s.column}>
				<div className={s.columnHeader}>
					<h2 className={s.columnTitle}>{title}</h2>
					<div className={s.columnActionsBtn}>
						<PlusOutlined
							onClick={() => addTask(columnId)}
							className={s.addTaskBtn}
						/>
						<EditOutlined onClick={editColumnHandle} className={s.editBtn} />
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
								{tasks.length === 0 ? (
									<div className={s.emptyState}>Перетащите задачу сюда</div>
								) : (
									tasks.map((task, index) => (
										<Draggable
											key={task.id}
											draggableId={task.id}
											index={index}
										>
											{provided => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													// className={`${s.task} ${
													// 	snapshot.isDragging ? s.dragging : ''
													// }`}
												>
													<ColumnItem
														boardId={boardId}
														task={task}
														columnId={columnId}
													/>
												</div>
											)}
										</Draggable>
									))
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			</div>
			{modalStore.singleModalIsOpen && <SingleModal />}
			{modalStore.taskModalIsOpen && <Modal />}
		</>
	);
});
