import { CloseOutlined } from '@ant-design/icons';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router';
import TurndownService from 'turndown';
import columnStore from '../../stores/columnStore';
import modalStore from '../../stores/modalStore';
import taskStore from '../../stores/taskStore';
import { TextEditor } from '../TextEditor/TextEditor';
import { Button } from '../ui/Button/Button';
import s from './Modal.module.scss';

export const Modal = () => {
	const handleContentClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		modalStore.closeTaskModal();
	};

	const { id: boardId } = useParams<{ id: string }>();
	const columnId = columnStore.columnId;
	const taskId = taskStore.taskId;
	const title = modalStore.modalMode;

	const editorTitle = useEditor({
		extensions: [StarterKit, Bold, Italic, Underline, Strike, Link],
		content: 'Task title here...',
		editorProps: {
			attributes: {
				class: `${s.editorTitle}`,
			},
		},
	});

	const editorDesc = useEditor({
		extensions: [StarterKit, Bold, Italic, Underline, Strike, Link],
		content: 'Task description here...',
		editorProps: {
			attributes: {
				class: ` ${s.editorDesc}`,
			},
		},
	});

	const turndownService = new TurndownService();

	const handleAddTask = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);

		const description = editorDesc?.getHTML() || '';
		const markdownDescription = turndownService.turndown(description);

		taskStore.addTaskToColumn(
			markdownTitle,
			markdownDescription,
			columnId,
			boardId
		);

		modalStore.closeTaskModal();
	};

	const handleEditTask = () => {
		const newTitle = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(newTitle);

		const newDescription = editorDesc?.getHTML() || '';
		const markdownDesc = turndownService.turndown(newDescription);

		taskStore.editTask(taskId, columnId, markdownTitle, markdownDesc, boardId);

		modalStore.closeTaskModal();
	};

	if (!modalStore.taskModalIsOpen) return null;
	return ReactDOM.createPortal(
		<div className={s.modalBg} onClick={handleContentClick}>
			<div className={s.modal} onClick={e => e.stopPropagation()}>
				<div className={s.modalHeader}>
					<h1 className={s.modalTitle}>{title}</h1>
					<CloseOutlined className={s.closeModalBtn} onClick={() => {}} />
				</div>
				<div className={s.taskTitle}>
					<label htmlFor='Sex'>Task title</label>
					<div className={s.inputWrapper}>
						<TextEditor className={s.titleEditor} editor={editorTitle} />
					</div>
				</div>
				<div className={s.taskDesc}>
					<label htmlFor='Sex'>Task description</label>
					<div className={cn(s.inputWrapper, s.textArea)}>
						<TextEditor className={s.descEditor} editor={editorDesc} />
					</div>
				</div>
				<div className={s.buttonWrapper}>
					{title === 'Edit task' ? (
						<Button className={s.modalButton} onClick={handleEditTask}>
							Edit task
						</Button>
					) : (
						<Button className={s.modalButton} onClick={handleAddTask}>
							Create task
						</Button>
					)}
				</div>
			</div>
		</div>,
		document.body
	);
};
