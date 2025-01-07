import {
	BoldOutlined,
	CloseOutlined,
	HighlightOutlined,
	ItalicOutlined,
	LinkOutlined,
	StrikethroughOutlined,
	UnderlineOutlined,
} from '@ant-design/icons';
import Bold from '@tiptap/extension-bold';
import Link from '@tiptap/extension-link'
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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

	const toggleBold = () => {
		editor?.chain().focus().toggleBold().run();
	};

	const toggleLink = () => {
		editor?.chain().focus().toggleBold().run();
	};

	const toggleItalic = () => {
		editor?.chain().focus().toggleItalic().run();
	};

	const toggleUnderline = () => {
		editor?.chain().focus().toggleUnderline().run();
	};

	const toggleStrike = () => {
		editor?.chain().toggleStrike().run();
	};

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className={s.modalBg} onClick={handleContentClick}>
			<div className={s.modal} onClick={e => e.stopPropagation()}>
				<div className={s.modalHeader}>
					<h1 className={s.modalTitle}>Create Task</h1>
					<CloseOutlined className={s.closeModalBtn} onClick={closeModal} />
				</div>
				<div className={s.taskTitle}>
					<label htmlFor='Sex'>Task title</label>
					<div className={s.inputWrapper}>
						<div>
							<HighlightOutlined />
							<input
								placeholder='Task title'
								className={cn(s.modal__input, s.input)}
								type='text'
							/>
						</div>
					</div>
				</div>
				<div className={s.taskDesc}>
					<label htmlFor='Sex'>Task description</label>
					<div className={s.inputWrapper}>
						<div className={s.inputForm}>
							<HighlightOutlined />
							<EditorContent
								className={s.textArea}
								editor={editor}
								placeholder='Task description'
							/>
						</div>
						<div className={s.toolbar}>
							<button onClick={toggleBold}>
								<BoldOutlined /> Bold
							</button>
							<button onClick={toggleItalic}>
								<ItalicOutlined /> Italic
							</button>
							<button onClick={toggleUnderline}>
								<UnderlineOutlined /> Underline
							</button>
							<button onClick={toggleStrike}>
								<StrikethroughOutlined /> Strike
							</button>
							<button onClick={toggleLink}>
								<LinkOutlined /> Link
							</button>
						</div>
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
