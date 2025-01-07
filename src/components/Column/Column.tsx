import { useState } from 'react';
import { CardItem } from '../CardItem/CardItem';
import { Button } from '../ui/button/button';
import s from './Column.module.scss';
import { Modal } from '../Modal/Modal';

interface ColumnProps {
	title: string;
}

export const Column = ({ title }: ColumnProps) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = () => setModalIsOpen(true);

	const closeModal = () => setModalIsOpen(false);

	return (
		<div className={s.column} id="todo">
			<h2 className={s.columnTitle}>{title}</h2>
			<div className={s.taskContainer}>
				<CardItem />
			</div>
			<div className={s.tasksInBtn}>
				<Button onClick={openModal} className={s.addTaskBtn}>
					Add Task
				</Button>
			</div>

			<Modal isOpen={modalIsOpen} closeModal={closeModal} />
		</div>
	);
};
