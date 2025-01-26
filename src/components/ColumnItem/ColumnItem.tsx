import { DeleteOutlined, HighlightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import taskStore from '../../stores/taskStore';
import { ITask } from '../../types/types';
import { Modal } from '../Modal/Modal';
import s from './ColumnItem.module.scss';

interface ColumnItemProps {
	task: ITask;
	columnId: string;
	boardId: string | undefined;
}

export const ColumnItem = observer(
	({ task, columnId, boardId }: ColumnItemProps) => {
		const [modalIsOpen, setModalIsOpen] = useState(false);

		const openEditModal = () => {
			setModalIsOpen(true);
		};

		const closeEditModal = () => {
			setModalIsOpen(false);
		};

		return (
			<div className={s.card}>
				<div className={s.cardHeader}>
					<h3 className={s.cardTitle}>{task.title}</h3>
					<Divider style={{ margin: 10 }} />
					<p className={s.cardDescription}>{task.description}</p>
				</div>
				<Divider style={{ margin: 10 }} />

				<div className={s.cardFooter}>
					<button
						onClick={() => taskStore.deleteTask(task.id, columnId, boardId)}
						className={s.cardButtons}
					>
						Delete <DeleteOutlined />
					</button>
					<button onClick={openEditModal} className={s.cardButtons}>
						Edit <HighlightOutlined />
					</button>
					<section>Priority</section>
				</div>

				{modalIsOpen && (
					<Modal
						isOpen={modalIsOpen}
						title={'Edit task'}
						taskId={task.id}
						columnId={columnId}
						onClose={closeEditModal}
					/>
				)}
			</div>
		);
	}
);
