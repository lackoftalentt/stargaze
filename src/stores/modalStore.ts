import { makeAutoObservable } from 'mobx';

class ModalStore {
	modalIsOpen = false;
	colModalIsOpen = false;

	modalMode: string = 'Create';
	colModalMode: string = 'Create';
	taskId: string | undefined = undefined;

	constructor() {
		makeAutoObservable(this);
	}

	openTaskModal(mode: string, id?: string) {
		this.modalMode = mode;
		this.taskId = id;
		this.modalIsOpen = true;
	}

	closeTaskModal() {
		this.modalIsOpen = false;
		this.taskId = undefined;
	}

	openColumnModal(mode: string) {
		this.colModalMode = mode;
		this.colModalIsOpen = true;
	}

	closeColumnModal() {
		this.colModalIsOpen = false;
	}
}

const modalStore = new ModalStore();
export default modalStore;
