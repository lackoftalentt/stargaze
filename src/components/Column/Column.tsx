import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import columnStore from '../../stores/columnStore';
import { IColumn } from '../../types/types';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import { Modal } from '../Modal/Modal';
import { Modal4Column } from '../Modal4Columns/SingleModal';
import s from './Column.module.scss';

interface ColumnProps {
	title?: string;
	columnId: string;
	column?: IColumn;
}

export const Column = observer(({ title, columnId }: ColumnProps) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [colModalIsOpen, setColModalIsOpen] = useState(false);
	const [taskId, setTaskId] = useState<string | undefined>('');
	const [modalMode, setModalMode] = useState<string>('Create');
	const [colModalMode, setColModalMode] = useState<string>('Create');

	const closeModal = useCallback(() => setModalIsOpen(false), []);
	const closeColModal = useCallback(() => setColModalIsOpen(false), []);

	const { id: boardId } = useParams<{ id: string }>();

	const tasks = columnStore.getTasksForColumn(columnId);

	const deleteColumn = useCallback(() => {
		columnStore.deleteColumn(columnId, boardId);
	}, [columnId]);

	const openTaskModal = (mode: string, id?: string) => {
		setTaskId(id);
		setModalMode(mode);
		setModalIsOpen(true);
	};

	const openColumnModal = (mode: string) => {
		setColModalMode(mode);
		setColModalIsOpen(true);
	};

	return (
		<div className={s.column}>
			<div className={s.columnHeader}>
				<h2 className={s.columnTitle}>{title}</h2>
				<div className={s.columnActionsBtn}>
					<PlusOutlined
						onClick={() => openTaskModal('Create task')}
						className={s.addTaskBtn}
					/>
					<EditOutlined
						onClick={() => openColumnModal('Edit column')}
						className={s.editBtn}
					/>
					<DeleteOutlined onClick={deleteColumn} className={s.deleteBtn} />
				</div>
			</div>
			<div className={s.taskContainer}>
				{tasks.map(task => (
					<ColumnItem
						boardId={boardId}
						key={task.id}
						task={task}
						columnId={columnId}
						openModal={() => openTaskModal('Edit', task.id)}
					/>
				))}
			</div>
			<Modal
				taskId={taskId}
				boardId={boardId}
				title={modalMode === 'Create task' ? 'Create Task' : 'Edit Task'}
				isOpen={modalIsOpen}
				closeModal={closeModal}
				columnId={columnId}
			/>

			<Modal4Column
				columnId={columnId}
				boardId={boardId}
				title={colModalMode === 'Create task' ? 'Create column' : 'Edit column'}
				isOpenCol={colModalIsOpen}
				closeModalCol={closeColModal}
			/>
		</div>
	);
});
