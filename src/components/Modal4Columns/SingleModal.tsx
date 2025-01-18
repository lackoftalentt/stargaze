import { CloseOutlined } from '@ant-design/icons';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ReactDOM from 'react-dom';
import TurndownService from 'turndown';
import columnStore from '../../stores/columnStore';
import { TextEditor } from '../TextEditor/TextEditor';
import { Button } from '../ui/Button/Button';
import s from './SingleModal.module.scss';

interface ModalProps {
	closeModalCol: () => void;
	isOpenCol: boolean;
	title: string;
	columnId?: string | undefined;
	boardId?: string;
}

export const Modal4Column = ({
	isOpenCol,
	closeModalCol,
	title,
	columnId,
	boardId,
}: ModalProps) => {
	// const navigate = useNavigate();
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

	const turndownService = new TurndownService();

	const createColumnHandler = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);
		columnStore.createColumn(markdownTitle);
		closeModalCol();
	};

	const createBoardHandler = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);
		columnStore.createBoard(markdownTitle);
		closeModalCol();
	};

	const editColumnHandler = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);
		columnStore.editColumn(columnId, markdownTitle);
		closeModalCol();
	};

	const editBoardHandler = () => {
		const title = editorTitle?.getHTML() || '';
		const markdownTitle = turndownService.turndown(title);
		columnStore.editBoard(boardId, markdownTitle);
		closeModalCol();
	};

	if (!isOpenCol) return null;

	return ReactDOM.createPortal(
		<div className={s.modalBg} onClick={closeModalCol}>
			<div className={s.modal} onClick={e => e.stopPropagation()}>
				<div className={s.modalHeader}>
					<h1 className={s.modalTitle}>{title}</h1>
					<CloseOutlined className={s.closeModalBtn} onClick={closeModalCol} />
				</div>
				<div className={s.taskTitle}>
					<label htmlFor='taskTitle'>{title}</label>
					<TextEditor editor={editorTitle} />
				</div>
				<div className={s.buttonWrapper}>
					{title === 'Edit column' ? (
						<Button
							className={s.modalButton}
							onClick={() => editColumnHandler()}
						>
							Edit column
						</Button>
					) : title === 'Create column' ? (
						<Button
							className={s.modalButton}
							onClick={() => createColumnHandler()}
						>
							Create column
						</Button>
					) : title === 'Create board' ? (
						<Button
							className={s.modalButton}
							onClick={() => createBoardHandler()}
						>
							Create board
						</Button>
					) : (
						boardId && (
							<Button
								className={s.modalButton}
								onClick={() => editBoardHandler()}
							>
								Edit board
							</Button>
						)
					)}
				</div>
			</div>
		</div>,
		document.body
	);
};
