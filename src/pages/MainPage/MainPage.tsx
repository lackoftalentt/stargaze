import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Modal4Column } from '../../components/Modal4Columns/SingleModal';
import { Button } from '../../components/ui/Button/Button';
import s from './MainPage.module.scss';

export const MainPage = observer(() => {
	// Локальные стейты для управления модалками
	const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

	// ID для передачи в модалку (если нужно, можно использовать конкретное значение или логику для его получения)
	const [selectedColumnId, setSelectedColumnId] = useState<string | undefined>(undefined);

	// Открытие модалки для создания проекта
	const openColumnModal = () => {
		setIsColumnModalOpen(true);
		setSelectedColumnId('newColumnId'); // Здесь можете задать свой ID для колонки
	};

	// Закрытие модалки
	const closeColumnModal = () => {
		setIsColumnModalOpen(false);
		setSelectedColumnId(undefined);
	};

	return (
		<>
			<main className={s.mainPage}>
				<div className={s.mainPage__content}>
					<img
						src='/src/assets/images/logo.png'
						className={s.logo}
						alt='Logo'
					/>
					<h1 className={s.title}>
						Welcome to Stargaze Your Project Management Hub! 🌟
					</h1>
					<p className={s.description}>
						Stargaze is a next-generation Kanban board designed to make your
						work more productive, organized, and inspiring.
					</p>
					<p className={s.description}>
						Stargaze helps you achieve your goals, whether it’s studying, work,
						or creative endeavors. Create a workspace that suits your needs and
						take control of your time like never before. Ready to turn chaos
						into clarity? Try Stargaze today! 🚀
					</p>
					<Button
						onClick={openColumnModal}
						className={s.button}
					>
						Create Project <PlusOutlined />
					</Button>
				</div>
			</main>

			{/* Модалка для создания проекта */}
			{isColumnModalOpen && (
				<Modal4Column
					title={'Create board'}
					isOpen={isColumnModalOpen}
					onClose={closeColumnModal}
					columnId={selectedColumnId}
				/>
			)}
		</>
	);
});
