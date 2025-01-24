import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { IBoard, IColumn, ITask } from '../types/types';

class BoardStore {
	boards: IBoard[] = [];

	constructor() {
		makeAutoObservable(this, {}, { deep: true });
	}

	getBoardById(boardId: string | undefined): IBoard | undefined {
		return this.boards.find(board => board.id === boardId);
	}

	createBoard(title: string) {
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
	}

	editBoard(boardId: string | undefined, newTitle: string) {
		const board = this.getBoardById(boardId);
		if (board) {
			board.title = newTitle;
		}
	}

	deleteBoard(boardId?: string) {
		const board = this.getBoardById(boardId);
		if (board) {
			this.boards = this.boards.filter(board => board.id !== boardId);
		}
	}

	updateBoardColumns(boardId: string | undefined, newColumns: IColumn[]) {
		const board = this.boards.find(board => board.id === boardId);
		if (board) {
			board.columns = newColumns;
		}
	}

	updateColumnTasks(columnId: string, updatedTasks: ITask[]) {
		for (const board of this.boards) {
			const column = board.columns.find(col => col.id === columnId);
			if (column) {
				column.tasks = updatedTasks;
			}
		}
	}
}

const boardStore = new BoardStore();
export default boardStore;
