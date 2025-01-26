import { CloseOutlined } from '@ant-design/icons';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router';
import TurndownService from 'turndown';
import boardStore from '../../stores/boardStore';
import columnStore from '../../stores/columnStore';
import { TextEditor } from '../TextEditor/TextEditor';
import { Button } from '../ui/Button/Button';
import s from './SingleModal.module.scss';

interface ModalProps {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	columnId: string | undefined
}

export const Modal4Column = ({ title, isOpen, onClose, columnId }: ModalProps) => {
	const editorTitle = useEditor({
		extensions: [StarterKit, Bold, Italic, Underline, Strike, Link],
		content: 'Title...',
		autofocus: true,
		editorProps: {
			attributes: {
				class: `${s.editorTitle}`,
			},
		},
	});

	const { id: boardId } = useParams();

	const turndownService = new TurndownService();

	const createColumnHandler = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);
		columnStore.createColumn(markdownTitle, boardId);
		onClose();
	};

	const createBoardHandler = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);
		boardStore.createBoard(markdownTitle);
		onClose();
	};

	const editColumnHandler = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);
		columnStore.editColumn(columnId, markdownTitle, boardId);
		onClose();
	};

	const editBoardHandler = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);
		boardStore.editBoard(boardId, markdownTitle);
		onClose();
	};

	const actions: Record<string, (() => void) | undefined> = {
		'Edit column': editColumnHandler,
		'Create column': createColumnHandler,
		'Create board': createBoardHandler,
		'Edit board': editBoardHandler,
	};

	const handleClick = actions[title];

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className={s.modalBg} onClick={onClose}>
			<div className={s.modal} onClick={e => e.stopPropagation()}>
				<div className={s.modalHeader}>
					<h1 className={s.modalTitle}>{title}</h1>
					<CloseOutlined
						className={s.closeModalBtn}
						onClick={onClose}
					/>
				</div>
				<div className={s.taskTitle}>
					<label htmlFor='taskTitle'>{title}</label>
					<TextEditor editor={editorTitle} />
				</div>
				<div className={s.buttonWrapper}>
					<Button className={s.modalButton} onClick={handleClick}>
						{title}
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
};
