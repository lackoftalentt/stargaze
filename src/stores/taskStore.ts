import { makeAutoObservable, toJS } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../types/types';
import boardStore from './boardStore';

class TaskStore {
	taskId: string | undefined = undefined;
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
		columnId: string | undefined,
		boardId: string | undefined
	) {
		const board = boardStore.getBoardById(boardId);
		if (board) {
			console.log(toJS(board));
			const column = board.columns.find(column => column.id === columnId);
			if (column) {
				console.log(toJS(column));
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
		columnId: string | undefined,
		newTitle: string,
		newDescription: string,
		boardId: string | undefined
	) {
		console.log('Edit Task called with params:');
		console.log('taskId:', taskId);
		console.log('columnId:', columnId);
		console.log('newTitle:', newTitle);
		console.log('newDescription:', newDescription);
		console.log('boardId:', boardId);

		const board = boardStore.getBoardById(boardId);

		if (board) {
			console.log('Board found:', toJS(board));
			const column = board.columns.find(column => column.id === columnId);

			if (column) {
				console.log('Column found:', toJS(column));
				const task = column.tasks.find(task => task.id === taskId);

				if (task) {
					console.log('Task found before editing:', toJS(task));
					task.title = newTitle;
					task.description = newDescription;
					console.log('Task after editing:', toJS(task));
				} else {
					console.log('Task not found with ID:', taskId);
				}
			} else {
				console.log('Column not found with ID:', columnId);
			}
		} else {
			console.log('Board not found with ID:', boardId);
		}
	}
}

const taskStore = new TaskStore();
export default taskStore;
