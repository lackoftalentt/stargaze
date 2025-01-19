import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { IBoard } from '../types/types';

class BoardStore {
	boards: IBoard[] = [];

	constructor() {
		makeAutoObservable(this);
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
}

const boardStore = new BoardStore();
export default boardStore;
