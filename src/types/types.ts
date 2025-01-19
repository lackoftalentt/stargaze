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
