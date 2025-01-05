import { makeAutoObservable } from 'mobx';

interface IUser {
	id: string | null;
	userName: string | null;
	email: string | null;
	token: string | null;
}
export class AuthStore {
	user: IUser | null = {
		id: null,
		userName: null,
		email: null,
		token: null,
	};
	constructor() {
		makeAutoObservable(this);

		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			this.user = JSON.parse(storedUser);
		}
	}
	setUser = (user: IUser) => {
		this.user = user;
		localStorage.setItem('user', JSON.stringify(user));
	};

	removeUser = () => {
		this.user = { id: null, userName: null, email: null, token: null };
		localStorage.removeItem('user');
	};
}

export default new AuthStore();
