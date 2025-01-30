import { makeAutoObservable, toJS } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { IColumn, ITask } from '../types/types';
import boardStore from './boardStore';

class ColumnStore {
	columnId: string | undefined = undefined;

	constructor() {
		makeAutoObservable(this, {}, { deep: true });
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
		console.log('Board ID before calling deleteColumn:', boardId);
		const board = boardStore.getBoardById(boardId);
		if (!board) {
			console.log('Board not found for deleteColumn. boardId:', boardId);
			return;
		}

		board.columns = board.columns.filter(column => column.id !== columnId);
		console.log('Column deleted. Remaining columns:', toJS(board.columns));
	}

	editColumn(
		columnId: string | undefined,
		newTitle: string,
		boardId: string | undefined
	) {
		const board = boardStore.getBoardById(boardId);
		if (!board) {
			console.log('Board not found for editColumn. boardId:', boardId);
			return;
		}

		const column = board.columns.find(column => column.id === columnId);
		if (!column) {
			console.log('Column not found for edit. columnId:', columnId);
			return;
		}

		column.title = newTitle;
		console.log('Updated column title:', column.title);
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
