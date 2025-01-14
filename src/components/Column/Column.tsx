import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useState } from 'react';
import columnStore, { IColumn } from '../../stores/columnStore';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import { Modal } from '../Modal/Modal';
import { Modal4Column } from '../Modal4Columns/Modal4Column';
import s from './Column.module.scss';

interface ColumnProps {
	title?: string;
	columnId: string;
	column?: IColumn;
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
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
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

	const { setNodeRef, attributes, listeners, transform, transition } =
		useSortable({
			id: columnId,
			data: {
				type: 'Column',
				column,
			},
		});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	// if(isDragging){
	// 	return <>sex</>
	// }

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

	const tasksIds = useMemo(() => {
		return tasks.map(task => task.id);
	}, [tasks]);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
				<div className={s.column} ref={setNodeRef} style={style}>
					<div {...attributes} {...listeners} className={s.columnHeader}>
						<h2 className={s.columnTitle}>{title}</h2>
						<div className={s.columnActionsBtn}>
							<PlusOutlined
								onClick={() => openTaskModal('Create')}
								className={s.addTaskBtn}
							/>
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
