import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../types/types';
import boardStore from './boardStore';

class TaskStore {
	constructor() {
		makeAutoObservable(this);
	}

	getTaskById(
		taskId: string,
		columnId: string,
		boardId: string | undefined
	): ITask | undefined {
		const board = boardStore.getBoardById(boardId);
		if (board) {
			const column = board.columns.find(column => column.id === columnId);
			if (column) {
				return column.tasks.find(task => task.id === taskId);
			}
		}
		return undefined;
	}

	addTaskToColumn(
		title: string,
		description: string,
		columnId: string,
		boardId: string | undefined
	) {
		const board = boardStore.getBoardById(boardId);
		if (board) {
			const column = board.columns.find(column => column.id === columnId);
			if (column) {
				const newTask: ITask = {
					id: uuidv4(),
					title,
					description,
					columnId,
				};
				column.tasks.push(newTask);
			}
		}
	}

	deleteTask(taskId: string, columnId: string, boardId: string | undefined) {
		const board = boardStore.getBoardById(boardId);
		if (board) {
			const column = board.columns.find(column => column.id === columnId);
			if (column) {
				column.tasks = column.tasks.filter(task => task.id !== taskId);
			}
		}
	}

	editTask(
		taskId: string | undefined,
		columnId: string,
		newTitle: string,
		newDescription: string,
		boardId: string | undefined
	) {
		const board = boardStore.getBoardById(boardId);
		if (board) {
			const column = board.columns.find(column => column.id === columnId);
			if (column) {
				const task = column.tasks.find(task => task.id === taskId);
				if (task) {
					task.title = newTitle;
					task.description = newDescription;
				}
			}
		}
	}
}

const taskStore = new TaskStore();
export default taskStore;
