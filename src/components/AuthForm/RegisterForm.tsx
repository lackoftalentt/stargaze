import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import st from './Form.module.scss';
import logo from '/src/assets/images/logo.png';

export const RegisterForm = () => {
	return (
		<div className={st.form}>
			<div className={st.form__header}>
				<img className={st.form__logo} src={logo} alt='' />
			</div>
			<div className={st.form__container}>
				<div className={st.userNameBlock}>
					<label>User Name</label>
					<div className={st.inputWrapper}>
						<UserOutlined />
						<input
							type='name'
							placeholder='morninginheaven'
							className={st.form__input}
						/>
					</div>
				</div>
				<div className={st.emailBlock}>
					<label>Email Adress</label>
					<div className={st.inputWrapper}>
						<MailOutlined />
						<input
							type='email'
							placeholder='leonardokizaru@gmail.com'
							className={st.form__input}
						/>
					</div>
				</div>
				<div className={st.passwordBlock}>
					<label>Password</label>
					<div className={st.inputWrapper}>
						<div>
							<div>
								<LockOutlined />
								<input
									type='password'
									placeholder='Password'
									className={st.form__input}
								/>
							</div>
							<div>
								<LockOutlined />
								<input
									type='password'
									placeholder='Confirm Password'
									className={st.form__input}
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<button className={st.button}>Sign Up</button>
					<p className={st.link}>
						Already have an account? <Link to='/login'>Log in</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
