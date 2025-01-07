import { Layout } from 'antd';
import st from './footer.module.scss';
const { Footer } = Layout;

export const FooterComponent = () => {
	return (
		<Footer style={{ textAlign: 'center', background: 'hsl(218deg 50% 91%)' }}>
			<footer className={`${st.footer}`}>
				<ul className={`${st.footer__content}`}>
					<li className={st.footer__items}>
						<a
							className={st.footer__links}
							href='https://t.me/lackofdisciplinee'
							target='_blank'
						>
							Telegram
						</a>
					</li>
					<li className={st.footer__items}>
						<a
							className={st.footer__links}
							href='mailto:leonardokizaru@gmail.com'
						>
							Email
						</a>
					</li>
					<li className={st.footer__items}>
						<a
							className={st.footer__links}
							target='_blank'
							href='https://www.instagram.com/morninginheaven/profilecard/'
						>
							Instagram
						</a>
					</li>
					<li className={st.footer__items}>
						<a
							className={st.footer__links}
							target='_blank'
							href='https://discord.gg/vY8Wjpjz'
						>
							Discord
						</a>
					</li>
					<li className={st.footer__items}>
						<a
							className={st.footer__links}
							href='https://github.com/lackoftalentt'
							target='_blank'
						>
							Github
						</a>
					</li>
					<li className={st.footer__items}>
						<p>👋</p>
					</li>
				</ul>
			</footer>
		</Footer>
	);
};
