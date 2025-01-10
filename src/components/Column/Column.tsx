import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import columnStore from '../../stores/columnStore';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import { Modal } from '../Modal/Modal';
import { Button } from '../ui/button/button';
import s from './Column.module.scss';

interface ColumnProps {
	title: string;
	columnId: string;
}

export const Column = observer(({ title, columnId }: ColumnProps) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [taskId, setTaskId] = useState<string | undefined>('');
	const closeModal = () => setModalIsOpen(false);
	const [modalMode, setModalMode] = useState<'Create' | 'Edit'>('Create');

	const column = columnStore.columns.find(column => column.id === columnId);
	const tasks = column ? column.tasks : [];

	const openModal = (mode: 'Create' | 'Edit', id?: string) => {
		setTaskId(id);
		console.log(id)
		setModalMode(mode);
		setModalIsOpen(true);
	};

	return (
		<div className={s.column}>
			<h2 className={s.columnTitle}>{title}</h2>
			<div className={s.taskContainer}>
				{tasks.map(task => (
					<ColumnItem
						openModal={() => openModal('Edit', task.id)}
						key={task.id}
						task={task}
						columnId={columnId}
					/>
				))}
			</div>
			<div className={s.tasksInBtn}>
				<Button onClick={() => openModal('Create')} className={s.addTaskBtn}>
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
		</div>
	);
});
