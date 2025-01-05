import { LockOutlined, MailOutlined, XOutlined } from '@ant-design/icons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import authStore from '../../stores/auth-store';
import st from './Form.module.scss';
import { IForm } from './RegisterForm';
import logo from '/src/assets/images/logo-black.png';

export const LoginForm = () => {
	const navigate = useNavigate();
	const { setUser } = authStore;
	const { register, handleSubmit, formState, setValue, watch } = useForm<IForm>(
		{
			mode: 'onChange',
		}
	);
	const email = watch('email');
	const password = watch('password');

	const emailError = formState.errors['email']?.message;
	const passwordError = formState.errors['password']?.message;

	const onSubmit: SubmitHandler<IForm> = async () => {
		const auth = getAuth();
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			const token = await user.getIdToken();

			const userData = {
				email: user.email,
				id: user.uid,
				token: token,
				userName: user.displayName,
			};

			setUser(userData);

			localStorage.setItem('user', JSON.stringify(userData));

			navigate('/');
		} catch (error) {
			console.error;
		}
	};
	return (
		<>
			<div>
				<p>morninginheaven..</p>
				<form onSubmit={handleSubmit(onSubmit)} className={st.form}>
					<div className={st.form__header}>
						<img className={st.form__logo} src={logo} alt='' />
					</div>
					<div className={st.form__container}>
						<div className={st.emailBlock}>
							<label>
								{emailError ? (
									<p style={{ color: 'tomato' }}>{emailError}</p>
								) : (
									'Email Adress'
								)}
							</label>
							<div className={st.inputWrapper}>
								<MailOutlined />
								<input
									type='email'
									placeholder='leonardokizaru@gmail.com'
									className={st.form__input}
									{...register('email', {
										required: 'This field is required',
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: 'Enter a valid email address',
										},
									})}
								/>
								{email && <XOutlined onClick={() => setValue('email', '')} />}
							</div>
						</div>
						<div className={st.passwordBlock}>
							<label>
								{passwordError ? (
									<p style={{ color: 'tomato' }}>{passwordError}</p>
								) : (
									'Passwords'
								)}
							</label>
							<div className={st.inputWrapper}>
								<LockOutlined />
								<input
									type='password'
									placeholder='Password'
									className={st.form__input}
									{...register('password', {
										required: 'This field is reqiured',
										minLength: {
											value: 8,
											message: 'Password must be at least 8 characters',
										},
									})}
								/>
							</div>
						</div>
						<div>
							<button
								className={st.button}
								onClick={() => handleSubmit(onSubmit)}
							>
								Login
							</button>
							<p className={st.link}>
								Don't have an account? <Link to='/register'>Sign up</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
