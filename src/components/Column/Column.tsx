import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import columnStore from '../../stores/columnStore';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import { Modal } from '../Modal/Modal';
import { Modal4Column } from '../Modal4Columns/Modal4Column';
import { Button } from '../ui/Button/Button';
import s from './Column.module.scss';

interface ColumnProps {
	title: string;
	columnId: string;
}

export const Column = observer(({ title, columnId }: ColumnProps) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [ColModalIsOpen, setColModalIsOpen] = useState(false);
	const [taskId, setTaskId] = useState<string | undefined>('');
	const [modalMode, setModalMode] = useState<'Create' | 'Edit'>('Create');
	const [colModalMode, setColModalMode] = useState<'Create' | 'Edit'>('Create');

	const closeModal = useCallback(() => setModalIsOpen(false), []);
	const closeColModal = useCallback(() => setColModalIsOpen(false), []);

	const column = columnStore.columns.find(col => col.id === columnId);
	const tasks = column ? column.tasks : [];

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;

			if (over) {
				const activeIndex = tasks.findIndex(task => task.id === active.id);
				const overIndex = tasks.findIndex(task => task.id === over.id);

				if (activeIndex !== -1 && overIndex !== -1) {
					columnStore.updateTaskOrder(
						columnId,
						arrayMove(tasks, activeIndex, overIndex)
					);
				}
			}
		},
		[tasks, columnId]
	);

	const deleteColumn = useCallback(() => {
		columnStore.deleteColumn(columnId);
	}, [columnId]);

	const openTaskModal = (mode: 'Create' | 'Edit', id?: string) => {
		setTaskId(id);
		setModalMode(mode);
		setModalIsOpen(true);
	};

	const openColumnModal = (mode: 'Create' | 'Edit') => {
		setColModalMode(mode);
		setColModalIsOpen(true);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={tasks} strategy={verticalListSortingStrategy}>
				<div className={s.column}>
					<div className={s.columnHeader}>
						<h2 className={s.columnTitle}>{title}</h2>
						<div className={s.columnActionsBtn}>
							<EditOutlined
								onClick={() => openColumnModal('Edit')}
								className={s.editBtn}
							/>
							<DeleteOutlined onClick={deleteColumn} className={s.deleteBtn} />
						</div>
					</div>
					<div className={s.taskContainer}>
						{tasks.map(task => (
							<ColumnItem
								key={task.id}
								task={task}
								columnId={columnId}
								openModal={() => openTaskModal('Edit', task.id)}
							/>
						))}
					</div>
					<div className={s.tasksInBtn}>
						<Button
							onClick={() => openTaskModal('Create')}
							className={s.addTaskBtn}
						>
							Add Task
						</Button>
					</div>

					<Modal
						taskId={taskId}
						title={modalMode === 'Create' ? 'Create' : 'Edit'}
						isOpen={modalIsOpen}
						closeModal={closeModal}
						columnId={columnId}
					/>

					<Modal4Column
						columnId={columnId}
						title={colModalMode === 'Create' ? 'Create Column' : 'Edit Column'}
						isOpenCol={ColModalIsOpen}
						closeModalCol={closeColModal}
					/>
				</div>
			</SortableContext>
		</DndContext>
	);
});
