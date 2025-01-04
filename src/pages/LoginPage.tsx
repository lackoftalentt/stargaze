import { LoginForm } from '../components/AuthForm/LoginForm';

export const LoginPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}}
		>
			<LoginForm />
		</div>
	);
};
