import { CloseOutlined } from '@ant-design/icons';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ReactDOM from 'react-dom';
import columnStore from '../../stores/columnStore';
import { TextEditor } from '../TextEditor/TextEditor';
import { Button } from '../ui/Button/Button';
import s from './Modal4Column.module.scss';

interface ModalProps {
	isOpenCol: boolean;
	closeModalCol: () => void;
}

export const Modal4Column = ({ isOpenCol, closeModalCol }: ModalProps) => {
	const editorTitle = useEditor({
		extensions: [StarterKit, Bold, Italic, Underline, Strike, Link],
		content: '<p>Column title...</p>',
		autofocus: true,
		editorProps: {
			attributes: {
				class: `${s.editorTitle}`,
			},
		},
	});

	const createColumnHandler = () => {
		const title = editorTitle?.getHTML() || '';
		columnStore.createColumn(title);
		closeModalCol();
	};

	if (!isOpenCol) return null;

	return ReactDOM.createPortal(
		<div className={s.modalBg} onClick={closeModalCol}>
			<div className={s.modal} onClick={e => e.stopPropagation()}>
				<div className={s.modalHeader}>
					<h1 className={s.modalTitle}>Create column</h1>
					<CloseOutlined className={s.closeModalBtn} onClick={closeModalCol} />
				</div>
				<div className={s.taskTitle}>
					<label htmlFor='taskTitle'>Task title</label>
					<TextEditor
						onContentChange={content =>
							editorTitle?.commands.setContent(content)
						}
						editor={editorTitle}
					/>
				</div>
				<div className={s.buttonWrapper}>
					<Button
						className={s.modalButton}
						onClick={() => createColumnHandler()}
					>
						Create column
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
};
