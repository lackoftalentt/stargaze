import {
	HighlightOutlined,
	LockOutlined,
	LoginOutlined,
	MailOutlined,
	XOutlined,
} from '@ant-design/icons';
import { FirebaseError } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import authStore from '../../stores/userStore';
import { Button } from '../ui/button/button';
import st from './forms.module.scss';
import { IForm } from './RegisterForm';
import logo from '/src/assets/images/logo-black.png';

interface IFireBaseError {
	email: string;
	userName: string;
	password: string;
}

export const LoginForm = () => {
	const navigate = useNavigate();
	const { setUser } = authStore;
	const { register, handleSubmit, formState, setValue, watch } = useForm<IForm>(
		{
			mode: 'onChange',
		}
	);

	const [firebaseError, setFirebaseError] = useState<IFireBaseError>({
		email: '',
		userName: '',
		password: '',
	});

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
			if (error instanceof FirebaseError) {
				switch (error.code) {
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
					case 'auth/invalid-credential':
						setFirebaseError(prev => ({
							...prev,
							password: 'Network error, please try again.',
						}));
						break;
						case 'auth/too-many-requests':
						setFirebaseError(prev => ({
							...prev,
							password: 'Network error, please try again.',
						}));
						break;
					default:
						console.error('An unexpected error occurred:', error.message);
				}
			}
		}
	};
	return (
		<>
			<div className={st.wrapperForm}>
				<p className={st.formTitle}>
					morninginheaven <HighlightOutlined />{' '}
				</p>
				<form onSubmit={handleSubmit(onSubmit)} className={st.form}>
					<div className={st.form__header}>
						<img className={st.form__logo} src={logo} alt='' />
					</div>
					<div className={st.form__container}>
						<div className={st.emailBlock}>
							<label>
								{emailError || firebaseError.email ? (
									<span style={{ color: 'tomato' }}>
										{emailError || firebaseError.email}
									</span>
								) : (
									'Email Address'
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
								{passwordError || firebaseError.password ? (
									<span style={{ color: 'tomato' }}>
										{passwordError || firebaseError.password}
									</span>
								) : (
									'Password'
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
								{password && (
									<XOutlined onClick={() => setValue('password', '')} />
								)}
							</div>
						</div>
						<div>
							<Button
								className={st.button}
								onClick={() => handleSubmit(onSubmit)}
							>
								Login <LoginOutlined/>
							</Button>
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
