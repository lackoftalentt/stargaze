import {
	HighlightOutlined,
	LockOutlined,
	LoginOutlined,
	MailOutlined,
	UserOutlined,
	XOutlined,
} from '@ant-design/icons';
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import authStore from '../../stores/userStore';
import { Button } from '../ui/Button/Button';
import st from './forms.module.scss';
import logo from '/src/assets/images/logo-black.png';

export interface IForm {
	email: string;
	userName: string;
	password: string;
	password2: string;
}

export const RegisterForm = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState, watch, setValue } = useForm<IForm>(
		{
			mode: 'onChange',
		}
	);

	const [firebaseError, setFirebaseError] = useState({
		email: '',
		userName: '',
		password: '',
	});

	const { setUser } = authStore;

	const emailError = formState.errors['email']?.message || firebaseError.email;
	const userNameError =
		formState.errors['userName']?.message || firebaseError.userName;
	const passwordError =
		formState.errors['password']?.message || firebaseError.password;
	const password2Error = formState.errors['password2']?.message;

	const email = watch('email');
	const userName = watch('userName');
	const password = watch('password');
	const password2 = watch('password2');

	const onSubmit: SubmitHandler<IForm> = async () => {
		const auth = getAuth();
		setFirebaseError({ email: '', userName: '', password: '' });
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(user, {
				displayName: userName,
			});

			const token = await user.getIdToken();

			const userData = {
				email: user.email,
				id: user.uid,
				token: token,
				userName: userName,
			};

			setUser(userData);
			localStorage.setItem('user', JSON.stringify(userData));
			navigate('/');
		} catch (error) {
			if (error instanceof Error) {
				switch (error.message) {
					case 'auth/email-already-in-use':
						setFirebaseError(prev => ({
							...prev,
							email: 'Email is already in use.',
						}));
						break;
					case 'auth/invalid-email':
						setFirebaseError(prev => ({
							...prev,
							email: 'Invalid email address.',
						}));
						break;
					case 'auth/weak-password':
						setFirebaseError(prev => ({
							...prev,
							password: 'Password is too weak.',
						}));
						break;
					case 'auth/operation-not-allowed':
						setFirebaseError(prev => ({
							...prev,
							email: 'Operation not allowed.',
						}));
						break;
					case 'auth/network-request-failed':
						setFirebaseError(prev => ({
							...prev,
							email: 'Network error, please try again.',
						}));
						break;
					default:
						console.error('An unexpected error occurred:', error.message);
				}
			}
		}
	};

	return (
		<div className={st.wrapperForm}>
			<p className={st.formTitle}>
				morninginheaven <HighlightOutlined />
			</p>
			<form className={st.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={st.form__header}>
					<img className={st.form__logo} src={logo} alt='' />
				</div>
				<div className={st.form__container}>
					<div className={st.userNameBlock}>
						<label>
							{userNameError ? (
								<p style={{ color: 'tomato' }}>{userNameError}</p>
							) : firebaseError.userName ? (
								<p style={{ color: 'tomato' }}>{firebaseError.userName}</p>
							) : (
								'Username'
							)}
						</label>
						<div className={st.inputWrapper}>
							<UserOutlined />
							<input
								{...register('userName', {
									required: 'This field is required',
								})}
								type='name'
								placeholder='morninginheaven'
								className={st.form__input}
							/>
							{userName && (
								<XOutlined onClick={() => setValue('userName', '')} />
							)}
						</div>
					</div>
					<div className={st.emailBlock}>
						<label>
							{emailError ? (
								<p style={{ color: 'tomato' }}>{emailError}</p>
							) : (
								'Email Address'
							)}
						</label>
						<div className={st.inputWrapper}>
							<MailOutlined />
							<input
								{...register('email', {
									required: 'This field is required',
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: 'Enter a valid email address',
									},
								})}
								type='email'
								placeholder='leonardokizaru@gmail.com'
								className={st.form__input}
							/>
							{email && <XOutlined onClick={() => setValue('email', '')} />}
						</div>
					</div>
					<div className={st.passwordBlock}>
						<label>
							{passwordError ? (
								<p style={{ color: 'tomato' }}>{passwordError}</p>
							) : password2Error ? (
								<p style={{ color: 'tomato' }}>{password2Error}</p>
							) : (
								'Passwords'
							)}
						</label>
						<div className={st.inputWrapper}>
							<div>
								<div>
									<LockOutlined />
									<input
										type='password'
										placeholder='Password'
										className={st.form__input}
										{...register('password', {
											required: 'This field is required',
											minLength: {
												value: 8,
												message: 'Password must be at least 8 characters',
											},
										})}
									/>
									{password && (
										<XOutlined onClick={() => setValue('password', '')} />
									)}
								</div>
								<div>
									<LockOutlined />
									<input
										type='password'
										placeholder='Confirm Password'
										className={st.form__input}
										{...register('password2', {
											validate: value =>
												value === password || 'Passwords do not match',
										})}
									/>
									{password2 && (
										<XOutlined onClick={() => setValue('password2', '')} />
									)}
								</div>
							</div>
						</div>
					</div>
					<div>
						<Button onClick={handleSubmit(onSubmit)} className={st.button}>
							Sign Up <LoginOutlined />
						</Button>
						<p className={st.link}>
							Already have an account? <Link to='/login'>Log in</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};
