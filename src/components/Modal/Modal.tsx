import { HighlightOutlined, XOutlined } from '@ant-design/icons';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import { Button } from '../ui/button/button';
import s from './modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	closeModal: () => void;
}

export const Modal = ({ isOpen, closeModal }: ModalProps) => {
	const handleContentClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		closeModal();
	};

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className={s.modalBg} onClick={handleContentClick}>
			<div className={s.modal} onClick={(e) => e.stopPropagation()}>
				<div className={s.modalHeader}>
					<h1 className={s.modalTitle}>Create Task</h1>
					<XOutlined className={s.closeModalBtn} onClick={closeModal} />
				</div>
				<div className={s.taskTitle}>
					<label htmlFor="Sex">Task title</label>
					<div className={s.inputWrapper}>
						<HighlightOutlined />
						<input
							placeholder="Task title"
							className={cn(s.modal__input, s.input)}
							type="text"
						/>
					</div>
				</div>
				<div className={s.taskDesc}>
					<label htmlFor="Sex">Task description</label>
					<div className={s.inputWrapper}>
						<textarea placeholder="Task description" className={s.textArea} />
					</div>
				</div>
				<div className={s.buttonWrapper}>
					<Button className={s.modalButton} onClick={() => {}}>
						Create task
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
};
