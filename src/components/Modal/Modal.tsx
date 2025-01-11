import { CloseOutlined } from '@ant-design/icons';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import TurndownService from 'turndown';
import columnStore from '../../stores/columnStore';
import { TextEditor } from '../TextEditor/TextEditor';
import { Button } from '../ui/Button/Button';
import s from './Modal.module.scss';
interface ModalProps {
	isOpen: boolean;
	closeModal: () => void;
	columnId: string;
	title: string;
	taskId: string | undefined;
}

export const Modal = ({
	isOpen,
	closeModal,
	columnId,
	title,
	taskId,
}: ModalProps) => {
	const handleContentClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		closeModal();
	};

	const editorTitle = useEditor({
		extensions: [StarterKit, Bold, Italic, Underline, Strike, Link],
		content: taskId ? '' : 'Task title here...',
		editorProps: {
			attributes: {
				class: `${s.editorTitle}`,
			},
		},
	});

	const editorDesc = useEditor({
		extensions: [StarterKit, Bold, Italic, Underline, Strike, Link],
		content: taskId ? '' : 'Task description here...',

		editorProps: {
			attributes: {
				class: ` ${s.editorDesc}`,
			},
		},
	});

	useEffect(() => {
		if (taskId) {
			const task = columnStore.columns
				.find(column => column.id === columnId)
				?.tasks.find(task => task.id === taskId);
			if (task) {
				editorTitle?.commands.setContent(task.title);
				editorDesc?.commands.setContent(task.description);
			}
		}
	}, [taskId, columnId]);

	const turndownService = new TurndownService();

	const handleAddTask = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);

		const description = editorDesc?.getHTML() || '';
		const markdownDescription = turndownService.turndown(description);

		columnStore.addTaskToColumn(markdownTitle, markdownDescription, columnId);
		closeModal();
	};

	const handleEditTask = () => {
		const newTitle = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(newTitle);

		const newDescription = editorDesc?.getHTML() || '';
		const markdownDesc = turndownService.turndown(newDescription);

		columnStore.editTask(taskId, columnId, markdownTitle, markdownDesc);
		closeModal();
	};

	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className={s.modalBg} onClick={handleContentClick}>
			<div className={s.modal} onClick={e => e.stopPropagation()}>
				<div className={s.modalHeader}>
					<h1 className={s.modalTitle}>{title} Task</h1>
					<CloseOutlined className={s.closeModalBtn} onClick={closeModal} />
				</div>
				<div className={s.taskTitle}>
					<label htmlFor='Sex'>Task title</label>
					<div className={s.inputWrapper}>
						<div>
							<TextEditor className={s.titleEditor} editor={editorTitle} />
						</div>
					</div>
				</div>
				<div className={s.taskDesc}>
					<label htmlFor='Sex'>Task description</label>
					<div className={cn(s.inputWrapper, s.textArea)}>
						<TextEditor className={s.descEditor} editor={editorDesc} />
					</div>
				</div>
				<div className={s.buttonWrapper}>
					{title === 'Edit' ? (
						<Button className={s.modalButton} onClick={() => handleEditTask()}>
							Edit task
						</Button>
					) : (
						<Button className={s.modalButton} onClick={() => handleAddTask()}>
							Create task
						</Button>
					)}
				</div>
			</div>
		</div>,
		document.body
	);
};
