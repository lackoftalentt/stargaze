import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Column } from '../../components/Column/Column';
import columnStore, { IColumn, ITask } from '../../stores/columnStore';
import authStore from '../../stores/userStore';
import s from './BoardPage.module.scss';

export const BoardPage = observer(() => {
	const isAuth = authStore.user?.token;
	const navigate = useNavigate();

	const { columns } = columnStore;
	const columnsId = useMemo(
		() => columns.map((column: IColumn) => column.id),
		[columns]
	);

	const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
	const [activeTask, setActiveTask] = useState<ITask | null>(null);

	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth, navigate]);

	const onDragStart = (event: DragStartEvent) => {
		if (event.active.data.current?.type === 'Column') {
			setActiveColumn(event.active.data.current.column);
			return;
		}

		if (event.active.data.current?.type === 'Task') {
			setActiveTask(event.active.data.current.task);
			return;
		}
	};

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		const activeColumnId = active.id;
		const overColumnId = over.id;

		if (activeColumnId === overColumnId) return;

		const activeColumnIndex = columns.findIndex(
			(column: IColumn) => column.id === activeColumnId
		);
		const overColumnIndex = columns.findIndex(
			(column: IColumn) => column.id === overColumnId
		);

		const newColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);
		columnStore.updateColumns(newColumns);
	};

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event;

		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveATask = active.data.current?.type === 'Task';
		const isOverATask = over.data.current?.type === 'Task';
		const isOverAColumn = over.data.current?.type === 'Column';

		if (isActiveATask && isOverATask) {
			const activeColumnId = active.data.current?.column.id;
			const overColumnId = over.data.current?.column.id;

			if (activeColumnId === overColumnId) {
				const column = columns.find(
					(column: IColumn) => column.id === activeColumnId
				);
				if (column) {
					const activeIndex = column.tasks.findIndex(
						(task: ITask) => task.id === activeId
					);
					const overIndex = column.tasks.findIndex(
						(task: ITask) => task.id === overId
					);
					const newTasks = arrayMove(column.tasks, activeIndex, overIndex);
					columnStore.updateTaskOrder(column.id, newTasks);
				}
			}
		} else if (isActiveATask && isOverAColumn) {
			const activeColumnId = active.data.current?.column.id;
			const overColumnId = over.id;

			if (activeColumnId !== overColumnId) {
				const activeColumn = columns.find(
					(column: IColumn) => column.id === activeColumnId
				);
				const overColumn = columns.find(
					(column: IColumn) => column.id === overColumnId
				);
				if (activeColumn && overColumn) {
					const activeIndex = activeColumn.tasks.findIndex(
						(task: ITask) => task.id === activeId
					);
					const [movedTask] = activeColumn.tasks.splice(activeIndex, 1);
					overColumn.tasks.push(movedTask);
					columnStore.updateColumns([...columns]);
				}
			}
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		})
	);

	return (
		<DndContext
			sensors={sensors}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragOver={onDragOver}
		>
			<main className={s.boardContainer}>
				<SortableContext items={columnsId}>
					{columns?.map(column => (
						<Column key={column.id} title={column.title} columnId={column.id} />
					))}
				</SortableContext>
			</main>
		</DndContext>
	);
});
