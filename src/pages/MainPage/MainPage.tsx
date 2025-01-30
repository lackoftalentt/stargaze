import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { SingleModal } from '../../components/Modal4Columns/SingleModal';
import { Button } from '../../components/ui/Button/Button';
import modalStore from '../../stores/modalStore';
import s from './MainPage.module.scss';

export const MainPage = observer(() => {
	const addBoardHandler = () => {
		modalStore.modalMode = 'Create board';
		modalStore.openSingleModal();
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
					<Button onClick={() => addBoardHandler()} className={s.button}>
						Create Project <PlusOutlined />
					</Button>
				</div>
			</main>

			{modalStore.singleModalIsOpen && <SingleModal />}
		</>
	);
});
