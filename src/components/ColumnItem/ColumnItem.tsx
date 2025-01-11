import { DeleteOutlined, HighlightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { observer } from 'mobx-react-lite';
import columnStore, { ITask } from '../../stores/columnStore';
import s from './ColumnItem.module.scss';

interface ColumnItemProps {
	task: ITask;
	columnId: string;
	openModal: (taskId: string) => void;
}

export const ColumnItem = observer(
	({ task, columnId, openModal }: ColumnItemProps) => {
		const deleteTask = () => {
			columnStore.deletefromTask(task.id, columnId);
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
					<button onClick={deleteTask} className={s.cardButtons}>
						Delete <DeleteOutlined />
					</button>
					<button onClick={() => openModal(task.id)} className={s.cardButtons}>
						Edit <HighlightOutlined />
					</button>
					<section>Priority</section>
				</div>
			</div>
		);
	}
);
