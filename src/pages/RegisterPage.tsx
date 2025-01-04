import { RegisterForm } from '../components/AuthForm/RegisterForm';

export const RegisterPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<RegisterForm />
		</div>
	);
};
