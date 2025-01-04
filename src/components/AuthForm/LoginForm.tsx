import { LockOutlined, MailOutlined } from '@ant-design/icons';
import st from './Form.module.scss';
import logo from '/src/assets/images/logo.png';
import { Link } from 'react-router';

export const LoginForm = () => {
	return (
		<>
			<div className={st.form}>
				<div className={st.form__header}>
					<img className={st.form__logo} src={logo} alt='' />
				</div>
				<div className={st.form__container}>
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
							<LockOutlined />
							<input
								type='password'
								placeholder='Password'
								className={st.form__input}
							/>
						</div>
					</div>
					<div>
						<button className={st.button}>Login</button>
						<p className={st.link}>
							Don't have an account? <Link to='/register'>Sign up</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
