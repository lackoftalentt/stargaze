import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { IColumn, ITask } from '../types/types';
import boardStore from './boardStore';

class ColumnStore {
	constructor() {
		makeAutoObservable(this);
	}

	getColumnById(columnId: string | undefined): IColumn | undefined {
		for (const board of boardStore.boards) {
			const column = board.columns.find(col => col.id === columnId);
			if (column) {
				return column;
			}
		}
		return undefined;
	}

	createColumn(title: string, boardId: string | undefined) {
		const board = boardStore.getBoardById(boardId);
		if (board) {
			const newColumn: IColumn = {
				id: uuidv4(),
				title,
				tasks: [],
			};
			board.columns.push(newColumn);
		}
	}

	deleteColumn(columnId: string, boardId: string | undefined) {
		const board = boardStore.getBoardById(boardId);
		if (board) {
			board.columns = board.columns.filter(column => column.id !== columnId);
		}
	}

	editColumn(
		columnId: string | undefined,
		newTitle: string,
		boardId: string | undefined
	) {
		const board = boardStore.getBoardById(boardId);
		if (board) {
			const column = board.columns.find(column => column.id === columnId);
			if (column) {
				column.title = newTitle;
				console.log(newTitle)
			}
		}
	}

	getTasksForColumn(columnId: string): ITask[] {
		for (const board of boardStore.boards) {
			const column = board.columns.find(col => col.id === columnId);
			if (column) {
				return column.tasks;
			}
		}
		return [];
	}
}

const columnStore = new ColumnStore();
export default columnStore;
