import {
	BoldOutlined,
	HighlightOutlined,
	ItalicOutlined,
	StrikethroughOutlined,
	UnderlineOutlined,
} from '@ant-design/icons';
import { Editor, EditorContent } from '@tiptap/react';
import cn from 'classnames';
import s from './TextEditor.module.scss';

interface TextEditorProps {
	editor: Editor | null;
	className?: string;
}

export const TextEditor = ({ editor, className }: TextEditorProps) => {
	return (
		<>
			<div className={cn(s.inputWrapper, className)}>
				<div className={s.inputForm}>
					<HighlightOutlined />
					<EditorContent className={cn(s.textArea, s.input)} editor={editor} />
				</div>
			</div>
			<div className={cn(s.toolbar)}>
				<button onClick={() => editor?.chain().focus().toggleBold().run()}>
					<BoldOutlined /> Bold
				</button>
				<button onClick={() => editor?.chain().focus().toggleItalic().run()}>
					<ItalicOutlined /> Italic
				</button>
				<button onClick={() => editor?.chain().focus().toggleUnderline().run()}>
					<UnderlineOutlined /> Underline
				</button>
				<button onClick={() => editor?.chain().focus().toggleStrike().run()}>
					<StrikethroughOutlined /> Strike
				</button>
				{/* <button onClick={() => editor?.chain().focus().toggleLink().run()}>
					<LinkOutlined /> Link
				</button> */}
			</div>
		</>
	);
};
