import authStore from '../stores/auth-store';

export const BoardPage = () => {
	const userName = authStore.user?.userName
	return <div>{userName}</div>;
};
