import { CloseOutlined } from '@ant-design/icons';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ReactDOM from 'react-dom';
import { EditorText } from '../EditorButtons';
import { Button } from '../ui/button/button';
import s from './modal4Columns.module.scss';

interface ModalProps {
	isOpenCol: boolean;
	closeModalCol: () => void;
}

export const Modal4Column = ({ isOpenCol, closeModalCol }: ModalProps) => {
	const handleContentClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		closeModalCol();
	};

	const editor = useEditor({
		extensions: [StarterKit, Bold, Italic, Underline, Strike, Link],
		content: '<p>Task description here...</p>',
		editorProps: {
			attributes: {
				class:
					'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
			},
		},
	});

	if (!isOpenCol) return null;

	return ReactDOM.createPortal(
		<div className={s.modalBg} onClick={handleContentClick}>
			<div className={s.modal} onClick={e => e.stopPropagation()}>
				<div className={s.modalHeader}>
					<h1 className={s.modalTitle}>Create column</h1>
					<CloseOutlined className={s.closeModalBtn} onClick={closeModalCol} />
				</div>
				<div className={s.taskTitle}>
					<label htmlFor='Sex'>Task title</label>
					<EditorText editor={editor} />
				</div>
				<div className={s.buttonWrapper}>
					<Button className={s.modalButton} onClick={() => {}}>
						Create column
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
};
