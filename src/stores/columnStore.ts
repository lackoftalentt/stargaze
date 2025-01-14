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

class ColumnStore {
	columns: IColumn[] = [
		{ id: uuidv4(), title: 'Todo', tasks: [] },
		{ id: uuidv4(), title: 'In Progress', tasks: [] },
		{ id: uuidv4(), title: 'Done', tasks: [] },
	];

	constructor() {
		makeAutoObservable(this);
	}

	createColumn = (title: string) => {
		this.columns.push({ id: uuidv4(), title, tasks: [] });
	};

	deleteColumn = (columnId: string | undefined) => {
		this.columns = this.columns.filter(column => column.id !== columnId);
	};

	updateColumns = (newColumns: IColumn[]) => {
		this.columns = newColumns;
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

	updateTaskOrder = (columnId: string, newTaskOrder: ITask[]) => {
		const column = this.columns.find(column => column.id === columnId);
		if (column) {
			column.tasks = newTaskOrder;
		}
	};

	moveTaskToColumn = (
		taskId: string,
		sourceColumnId: string,
		destinationColumnId: string
	) => {
		const sourceColumn = this.columns.find(column => column.id === sourceColumnId);
		const destinationColumn = this.columns.find(column => column.id === destinationColumnId);

		if (sourceColumn && destinationColumn) {
			const task = sourceColumn.tasks.find(task => task.id === taskId);
			if (task) {
				sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== taskId);
				task.columnId = destinationColumnId;
				destinationColumn.tasks.push(task);
			}
		}
	};
}

const columnStore = new ColumnStore();
export default columnStore;
