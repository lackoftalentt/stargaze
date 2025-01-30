import { makeAutoObservable } from 'mobx';

class ModalStore {
	modalMode = '';
	singleModalIsOpen = false;
	taskModalIsOpen = false;

	constructor() {
		makeAutoObservable(this);
	}

	openSingleModal = () => {
		this.singleModalIsOpen = true;
	};

	closeSingleModal = () => {
		this.singleModalIsOpen = false;
	};

	openTaskModal = () => {
		this.taskModalIsOpen = true;
	};

	closeTaskModal = () => {
		this.taskModalIsOpen = false;
	};
}

const modalStore = new ModalStore();
export default modalStore;
