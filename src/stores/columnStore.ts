import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export interface ITask {
	id: string;
	title: string;
	description: string;
	columnId: string;
}

export interface IColumn {
	id: string;
	title: string;
	tasks: ITask[];
}

export interface IBoard {
	id: string;
	title: string;
	columns: IColumn[];
}

class ColumnStore {
	constructor() {
		makeAutoObservable(this);
	}

	boards: IBoard[] = [
		{
			id: uuidv4(),
			title: 'Board 1',
			columns: [
				{ id: uuidv4(), title: 'Todo', tasks: [] },
				{ id: uuidv4(), title: 'In Progress', tasks: [] },
				{ id: uuidv4(), title: 'Done', tasks: [] },
			],
		},
	];

	getBoardById = (boardId: string | undefined): IBoard | undefined => {
		return this.boards.find(board => board.id === boardId);
	};

	createBoard = (title: string) => {
		const newBoard: IBoard = {
			id: uuidv4(),
			title,
			columns: [
				{ id: uuidv4(), title: 'Todo', tasks: [] },
				{ id: uuidv4(), title: 'In Progress', tasks: [] },
				{ id: uuidv4(), title: 'Done', tasks: [] },
			],
		};
		this.boards.push(newBoard);
	};

	editBoard = (boardId: string | undefined, newTitle: string) => {
		const board = this.boards.find(board => board.id === boardId);
		if (board) {
			board.title = newTitle;
		}
	};

	get columns() {
		return this.boards.length > 0 ? this.boards[0].columns : [];
	}

	createColumn = (title: string) => {
		if (this.boards.length > 0) {
			this.boards[0].columns.push({ id: uuidv4(), title, tasks: [] });
		}
	};

	deleteColumn = (columnId: string) => {
		if (this.boards.length > 0) {
			this.boards[0].columns = this.boards[0].columns.filter(
				column => column.id !== columnId
			);
		}
	};

	updateColumns = (newColumns: IColumn[]) => {
		if (this.boards.length > 0) {
			this.boards[0].columns = newColumns;
		}
	};

	addTaskToColumn = (title: string, description: string, columnId: string) => {
		const column = this.columns.find(column => column.id === columnId);
		if (column) {
			column.tasks.push({ id: uuidv4(), title, description, columnId });
		}
	};

	deleteFromTask = (taskId: string, columnId: string) => {
		const column = this.columns.find(column => column.id === columnId);
		if (column) {
			column.tasks = column.tasks.filter(task => task.id !== taskId);
		}
	};

	editColumn = (columnId: string | undefined, newTitle: string) => {
		const column = this.columns.find(column => column.id === columnId);
		if (column) {
			column.title = newTitle;
		}
	};

	editTask = (
		taskId: string | undefined,
		columnId: string,
		newTitle: string,
		newDescription: string
	) => {
		const column = this.columns.find(column => column.id === columnId);
		if (column) {
			const task = column.tasks.find(task => task.id === taskId);
			if (task) {
				task.title = newTitle;
				task.description = newDescription;
			}
		}
	};
}

const columnStore = new ColumnStore();
export default columnStore;
