import {
	BoldOutlined,
	HighlightOutlined,
	ItalicOutlined,
	LinkOutlined,
	StrikethroughOutlined,
	UnderlineOutlined,
} from '@ant-design/icons';
import { EditorContent } from '@tiptap/react';
import cn from 'classnames';
import s from './editorbuttons.module.scss';

export const EditorText = ({ editor }: { editor: any }) => (
	<div className={s.inputWrapper}>
		<div className={s.inputForm}>
			<HighlightOutlined />
			<EditorContent className={cn(s.textArea, s.input)} editor={editor} />
		</div>
		<div className={cn(s.toolbar)}>
			<button onClick={() => editor.chain().focus().toggleBold().run()}>
				<BoldOutlined /> Bold
			</button>
			<button onClick={() => editor.chain().focus().toggleItalic().run()}>
				<ItalicOutlined /> Italic
			</button>
			<button onClick={() => editor.chain().focus().toggleUnderline().run()}>
				<UnderlineOutlined /> Underline
			</button>
			<button onClick={() => editor.chain().toggleStrike().run()}>
				<StrikethroughOutlined /> Strike
			</button>
			<button onClick={() => editor.chain().focus().toggleLink().run()}>
				<LinkOutlined /> Link
			</button>
		</div>
	</div>
);
